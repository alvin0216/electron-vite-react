import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { useState } from 'react';
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

const MD5: React.FC<MD5Props> = (props) => {
  return (
    <ProForm layout='horizontal' initialValues={{ hash: 'xxx' }}>
      <ProFormUploadDragger
        max={1}
        label='Uploader'
        name='dragger'
        fieldProps={{ beforeUpload: () => false }}
        title='Click or drag file to this area'
        description=''
      />

      <ProForm.Item name='hash' label='Hash'>
        <HashText />
      </ProForm.Item>
    </ProForm>
  );
};

export default MD5;
