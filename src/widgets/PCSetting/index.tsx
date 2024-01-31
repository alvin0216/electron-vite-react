import { ProForm, ProFormRadio } from '@ant-design/pro-components';
import CountrySetting from './CountrySetting';

const PCSetting: React.FC = () => {
  return (
    <>
      <ProForm layout='horizontal' wrapperCol={{ span: 24 }} submitter={false}>
        <ProFormRadio.Group
          radioType='button'
          fieldProps={{ buttonStyle: 'solid' }}
          label='Gaming'
          options={[
            { label: 'Non Gaming', value: 'NoGaming' },
            { label: 'Gaming', value: 'Gaming' },
          ]}
        />
        <ProForm.Item label='Region'>
          <CountrySetting />
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default PCSetting;
