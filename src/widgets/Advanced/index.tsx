import VantageBin from '@/components/VantageBin';
import { Avatar, Badge, Button, Card, Space } from 'antd';
import LinkList from './LinkList';
import UserProfile from './UserProfile';
import Announcement from './Announcement';

interface AdvancedProps {}

const Advanced: React.FC<AdvancedProps> = (props) => {
  return (
    <div
      style={{
        background: 'rgb(240, 242, 245)',
        minHeight: 'calc(100vh - 189px)',
      }}
      className='absolute top-0 left-0 py-24 w-full'>
      <Space className='px-24' wrap align='baseline' size='large'>
        <Announcement />

        <Card hoverable headStyle={{ background: 'rgba(0, 0, 0, 0.02)' }} title='VantageBin' className='w-600'>
          <Space>
            <VantageBin action='stop' />
            <VantageBin action='start' />
            <VantageBin action='reboot' />
          </Space>
        </Card>

        <Card hoverable headStyle={{ background: 'rgba(0, 0, 0, 0.02)' }} title='User Profile' className='w-600'>
          <UserProfile />
        </Card>
      </Space>
    </div>
  );
};

export default Advanced;
