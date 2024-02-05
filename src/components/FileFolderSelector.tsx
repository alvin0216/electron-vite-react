import { useIpc } from '@/hooks/useIpc';
import { FileAddOutlined, FolderAddOutlined } from '@ant-design/icons';
import { IPCEnum } from '@constants/enum';
import { Button } from 'antd';

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
      <div className='ant-form-item-extra'>{value}</div>
    </>
  );
};

export const FileSelector: React.FC<ProFormFolderProps> = (props) => {
  const { value, onChange } = props;
  const { invoke } = useIpc();

  const handleClick = () => {
    invoke(IPCEnum.SelectPackageJson).then((path) => {
      path && onChange?.(path);
    });
  };

  return (
    <>
      <Button icon={<FileAddOutlined />} onClick={handleClick}>
        Select package.json
      </Button>
      <div className='ant-form-item-extra'>{value}</div>
    </>
  );
};
