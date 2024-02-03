import { NotificationOutlined } from '@ant-design/icons';
import { Alert, Button } from 'antd';

interface NoticeProps {}

const Notice: React.FC<NoticeProps> = (props) => {
  return (
    <div className='ml-16 flex-1 flex flex-row-reverse'>
      <Alert
        closable
        message='The software version has been updated to xxxx, please download to experience it! '
        type='info'
        showIcon
        icon={<NotificationOutlined />}
        action={
          <Button size='small' type='link'>
            Download
          </Button>
        }
      />
    </div>
  );
};

export default Notice;
