import { CheckOutlined, FormOutlined, LockOutlined } from '@ant-design/icons';
import { FileStatus } from '@constants/enum';
import { Button, Tooltip } from 'antd';

interface ToggleWriteableProps {
  fileStatus: FileStatus;
}

const ToggleWriteable: React.FC<ToggleWriteableProps> = ({ fileStatus }) => {
  const disabled = fileStatus === FileStatus.NotFound;
  const icon = fileStatus === FileStatus.Readonly ? <LockOutlined /> : <FormOutlined />;
  const tip = fileStatus === FileStatus.Readonly ? 'Click to set file writable' : 'Click to set file readonly';

  return (
    <Tooltip title={tip}>
      <Button className='capitalize' icon={icon} type='primary' ghost disabled={disabled}>
        {fileStatus}
      </Button>
    </Tooltip>
  );
};

export default ToggleWriteable;
