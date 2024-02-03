import { FolderOpenOutlined } from '@ant-design/icons';
import { FileStatus } from '@constants/enum';
import { Button, Space, Tooltip } from 'antd';
import ReactJson from 'react-json-view';

interface JsonViewProps {
  title: React.ReactNode;
  fileStatus?: FileStatus;
  json: any;
  setJson: (newJson: object) => void;
  open: () => void;
  sortKeys?: boolean;
}

const JsonView: React.FC<JsonViewProps> = ({ json, setJson, title, open, fileStatus, sortKeys }) => {
  const Title = () => (
    <Space>
      <Space>
        {title}
        <span className='c-gray'>({fileStatus})</span>
      </Space>
      <Tooltip title='open file'>
        <Button
          disabled={fileStatus === FileStatus.NotFound}
          className='!w-auto !h-auto p-0'
          icon={<FolderOpenOutlined />}
          type='link'
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        />
      </Tooltip>
    </Space>
  );

  return (
    <ReactJson
      // @ts-ignore
      name={<Title />}
      sortKeys={sortKeys}
      src={json}
      enableClipboard={false}
      displayDataTypes={false}
      onEdit={(data) => setJson(data.updated_src)}
      onAdd={(data) => setJson(data.updated_src)}
      onDelete={(data) => setJson(data.updated_src)}
    />
  );
};

export default JsonView;
