import { ProForm, ProFormInstance, ProFormRadio, ProFormSelect, ProFormSwitch } from '@ant-design/pro-components';

import { useRef, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { AppTypeEnum, FileKeyEnum } from '@constants/enum';
import { useFile } from '@/hooks/useFile';
import JsonView from '@/components/JsonView';

interface FormFields {
  EntryUrl: string;
  CertPin: boolean;
}

const EnvTools: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [appType, setAppType] = useState('non-beta');
  const { json, setJson, open, status } = useFile(
    appType === AppTypeEnum.Beta ? FileKeyEnum.BetaConfigJson : FileKeyEnum.ConfigJson
  );

  useUpdateEffect(() => {
    formRef?.current?.setFieldsValue({ EntryUrl: json?.EntryUrl, CertPin: json?.CertPin });
  }, [json]);

  const onValuesChange = (changedValues: any, values: FormFields) => {
    setJson({ ...json, ...values });
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ProForm<FormFields>
        formRef={formRef}
        layout='horizontal'
        onValuesChange={onValuesChange}
        initialValues={{ VantageType: 'beta' }}
        submitter={false}>
        <ProFormRadio.Group
          label='Vantage'
          valueEnum={{ [AppTypeEnum.NonBeta]: AppTypeEnum.NonBeta, [AppTypeEnum.Beta]: AppTypeEnum.Beta }}
          fieldProps={{
            value: appType,
            onChange: (e) => setAppType(e.target.value),
          }}
        />
        <ProFormSwitch name='CertPin' label='CertPin' />

        <ProFormSelect
          width={200}
          name='EntryUrl'
          label='Entry'
          allowClear={false}
          valueEnum={{
            'http://127.0.0.1:4201/': '4201',
            'http://127.0.0.1:4200/': '4200',
            'https://vantage.csw-dev.lenovo.com/v1/web/main/default/': 'Dev1',
            'https://vantage-2.csw-dev.lenovo.com/v1/web/main/default/': 'Dev2',
            'https://vantage.csw-qa.lenovo.com/v1/web/main/default/': 'QA1',
            'https://vantage-2.csw-qa.lenovo.com/v1/web/main/default/': 'QA2',
            'https://vantage-beta.csw.lenovo.com/v1/web/main/default/': 'SIT(beta)',
            'https://vantage.csw-stage.lenovo.com/v1/web/main/default/': 'STAGE',
            'https://vantage.csw.lenovo.com/v1/web/main/default/': 'PROD',
          }}
        />
      </ProForm>

      <JsonView title='config.json' fileStatus={status as any} json={json} setJson={setJson} open={open} />
    </div>
  );
};

export default EnvTools;
