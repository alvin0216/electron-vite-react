import { Avatar, Badge, Button, Card, Divider, Tooltip } from 'antd';
import LinkList from './LinkList';
import avatar from '../../assets/avatar.png';

interface AnnouncementProps {}

const Announcement: React.FC<AnnouncementProps> = () => {
  return (
    <Badge.Ribbon text={`Vantage Dev Tools v${APP_VERSION}`} color='magenta'>
      <Card hoverable headStyle={{ background: 'rgba(0, 0, 0, 0.02)' }} title='Announcement' className='w-600'>
        {/* ... */}
        <div className='mb-12'>
          <Tooltip title='Author Alvin'>
            <Avatar src={avatar} />
          </Tooltip>

          <Button href='mailto:guosw5@lenovo.com?subject=Vantage Dev Tools Suggestions' type='link'>
            guosw5@lenovo.com
          </Button>
        </div>
        <Divider />
        <LinkList />
      </Card>
    </Badge.Ribbon>
  );
};

export default Announcement;
