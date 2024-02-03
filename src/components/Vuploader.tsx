import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { UploadFile } from 'antd/lib';
import { CheckOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

interface Vuploader {
  title: React.ReactNode;
  description?: React.ReactNode;
  value?: UploadFile[];
  onChange?: (list: UploadFile[]) => void;
}

const Vuploader: React.FC<Vuploader> = ({
  value,
  onChange,
  title,
  description = ' Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.',
}) => (
  <Dragger
    multiple
    directory
    accept='.json'
    fileList={value}
    onChange={({ fileList }) => onChange?.(fileList)}
    iconRender={(f) => {
      return <CheckOutlined style={{ color: '#52c41a' }} />;
    }}
    beforeUpload={() => false}>
    <p className='ant-upload-drag-icon'>
      <InboxOutlined />
    </p>
    <p className='ant-upload-text'>{title}</p>
    <p className='ant-upload-hint'>{description}</p>
  </Dragger>
);

export default Vuploader;
