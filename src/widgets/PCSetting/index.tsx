import { ProForm, ProFormInstance, ProFormRadio } from '@ant-design/pro-components';
import CountrySetting from './CountrySetting';
import { IPCEnum, PCTypeEnum } from '@constants/enum';
import { useRequest } from 'ahooks';
import { useIpc } from '@/hooks/useIpc';
import { Spin } from 'antd';
import { useRef } from 'react';

const PCSetting: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { invoke } = useIpc();
  const { data, loading, run, error } = useRequest(() =>
    invoke(IPCEnum.ReadPCSetting).then((res) => {
      formRef.current?.setFieldsValue(res);
    })
  );

  return (
    <Spin spinning={loading}>
      <ProForm formRef={formRef} layout='horizontal' wrapperCol={{ span: 24 }} submitter={false}>
        <ProFormRadio.Group
          radioType='button'
          fieldProps={{ buttonStyle: 'solid' }}
          name='pcType'
          label='PC Type'
          options={[
            { label: 'Non Gaming', value: PCTypeEnum.NotGaming },
            { label: 'Gaming', value: PCTypeEnum.Gaming },
          ]}
        />
        <ProForm.Item name='country' label='Country'>
          <CountrySetting />
        </ProForm.Item>
      </ProForm>
    </Spin>
  );
};

export default PCSetting;
