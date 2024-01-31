import { FolderOpenOutlined } from '@ant-design/icons';
import { Badge, Button, Space, Tooltip } from 'antd';
import ReactJson from 'react-json-view';

interface JsonViewProps {
  title: string;
  json: any;
  setJson: (newJson: object) => void;
  open: () => void;
  isFileReadonly?: boolean;
}

const JsonView: React.FC<JsonViewProps> = ({ json, setJson, title, open, isFileReadonly }) => {
  const showFileStatus = isFileReadonly !== undefined;

  const renderTitle = () => {
    if (!showFileStatus) return <span>{title}</span>;
    const subTitle = isFileReadonly ? '(readonly)' : '(writable)';
    return (
      <span>
        {title}
        <span className='c-gray'>{subTitle}</span>
      </span>
    );
  };

  return (
    <ReactJson
      // @ts-ignore
      name={
        <Space>
          {renderTitle()}

          <Tooltip title='open file'>
            <Button
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
      }
      sortKeys
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
