import { useStore } from '@/hooks/useStore';
import { ProForm, ProFormInstance, ProFormRadio, ProFormSwitch } from '@ant-design/pro-components';
import ReactJson from 'react-json-view';
import { useRef, useState } from 'react';
import { Button } from 'antd';
import { useUpdateEffect } from 'ahooks';

interface FormFields {
  EntryUrl: string;
  CertPin: boolean;
}

const Configurator: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [appType, setAppType] = useState('non-beta');
  const [{ configJson, betaConfigJson }] = useStore();

  const json = appType === 'beta' ? betaConfigJson : configJson;

  useUpdateEffect(() => {
    formRef?.current?.setFieldsValue({ EntryUrl: json?.EntryUrl, CertPin: json?.CertPin });
  }, [json]);

  const onUpdateJson = (newJson: object) => {
    console.log('%c newJson:', 'color: red', newJson);
    window.ipcRenderer?.send('on-update-file', {
      key: 'configJson',
      json: newJson,
    });
  };

  const onValuesChange = (changedValues: any, values: FormFields) => {
    onUpdateJson({ ...json, ...values });
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ProForm<FormFields>
        formRef={formRef}
        layout='horizontal'
        onValuesChange={onValuesChange}
        initialValues={{ VantageType: 'beta' }}
        submitter={{
          render: () => <Button type='primary'>open the file</Button>,
        }}>
        <ProFormRadio.Group
          radioType='button'
          fieldProps={{ buttonStyle: 'solid' }}
          name='EntryUrl'
          label='Entry'
          options={[
            { label: '4201', value: 'http://127.0.0.1:4201/' },
            { label: '4200', value: 'http://127.0.0.1:4200/' },
            { label: 'Dev1', value: 'https://vantage.csw-dev.lenovo.com/v1/web/main/default/' },
            { label: 'Dev2', value: 'https://vantage-2.csw-dev.lenovo.com/v1/web/main/default/' },
            { label: 'QA1', value: 'https://vantage.csw-qa.lenovo.com/v1/web/main/default/' },
            { label: 'QA2', value: 'https://vantage-2.csw-qa.lenovo.com/v1/web/main/default/' },
            { label: 'SIT(beta)', value: 'https://vantage-beta.csw.lenovo.com/v1/web/main/default/' },
            { label: 'STAGE', value: 'https://vantage.csw-stage.lenovo.com/v1/web/main/default/' },
            { label: 'PROD', value: 'https://vantage.csw.lenovo.com/v1/web/main/default/' },
          ]}
        />

        <ProFormRadio.Group
          label='Vantage'
          valueEnum={{ 'non-beta': 'non-beta', beta: 'beta' }}
          fieldProps={{
            value: appType,
            onChange: (e) => setAppType(e.target.value),
          }}
        />
        <ProFormSwitch name='CertPin' label='CertPin' />
      </ProForm>

      <ReactJson
        name={'Data'}
        sortKeys
        src={json!}
        enableClipboard={false}
        displayDataTypes={false}
        onEdit={(data) => onUpdateJson(data.updated_src)}
        onAdd={(data) => onUpdateJson(data.updated_src)}
        onDelete={(data) => onUpdateJson(data.updated_src)}
      />
    </div>
  );
};

export default Configurator;
