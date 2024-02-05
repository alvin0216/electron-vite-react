import { useIpc } from '@/hooks/useIpc';
import { FileAddOutlined, FolderAddOutlined } from '@ant-design/icons';
import { IPCEnum } from '@constants/enum';
import { Button, message } from 'antd';

interface ProFormFolderProps {
  value?: string;
  onChange?: (v: string) => void;
}

export const FolderSelector: React.FC<ProFormFolderProps> = (props) => {
  const { value, onChange } = props;
  const { invoke } = useIpc();

  const handleClick = () => {
    invoke(IPCEnum.SelectFolder).then((path) => {
      path && onChange?.(path);
    });
  };

  return (
    <>
      <Button icon={<FolderAddOutlined />} onClick={handleClick}>
        Select repo folder
      </Button>
      {value && <div className='ant-form-item-extra'>{value}</div>}
    </>
  );
};

export const FileSelector: React.FC<ProFormFolderProps> = (props) => {
  const { value, onChange } = props;
  const { invoke } = useIpc();

  const handleClick = () => {
    invoke(IPCEnum.SelectPackageJson).then((path) => {
      if (path) {
        path.endsWith('package.json') ? onChange?.(path) : message.warning('Please select your repo package.json');
      }
    });
  };

  return (
    <>
      <Button icon={<FileAddOutlined />} onClick={handleClick}>
        Select package.json
      </Button>
      {value && <div className='ant-form-item-extra'>{value}</div>}
    </>
  );
};
