import { useIpc } from '@/hooks/useIpc';
import { ProForm, ProFormInstance, ProFormUploadDragger } from '@ant-design/pro-components';
import { IPCEnum } from '@constants/enum';
import { Typography } from 'antd';
import { useRef } from 'react';
const { Paragraph } = Typography;

interface MD5Props {}

const HashText: React.FC<{ value?: string }> = ({ value }) => {
  if (!value) return '-';

  return (
    <Paragraph className='!mb-0' copyable={{ tooltips: value }}>
      {value}
    </Paragraph>
  );
};

const MD5: React.FC<MD5Props> = () => {
  const formRef = useRef<ProFormInstance>();
  const { invoke } = useIpc();

  const handleSubmit = async (v: any) => {
    const filePath = v.filePath?.[0]?.originFileObj.path;
    if (!filePath) return false;
    const data = await invoke(IPCEnum.GetMD5, filePath);
    formRef.current?.setFieldValue('hash', data);
    return true;
  };

  return (
    <ProForm layout='horizontal' formRef={formRef} onFinish={handleSubmit}>
      <ProFormUploadDragger
        max={1}
        label='Uploader'
        name='filePath'
        fieldProps={{ beforeUpload: () => false }}
        title='Click or drag file to this area'
        description=''
        required
        rules={[{ required: true, message: 'Please upload the file' }]}
      />

      <ProForm.Item name='hash' label='Hash'>
        <HashText />
      </ProForm.Item>
    </ProForm>
  );
};

export default MD5;
