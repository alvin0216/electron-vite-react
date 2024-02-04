import VantageBin from '@/components/VantageBin';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Space } from 'antd';

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
        <Badge.Ribbon text={`Vantage Dev Tools v${1.5}`} color='magenta'>
          <Card hoverable headStyle={{ background: 'rgba(0, 0, 0, 0.02)' }} title='Announcement' className='w-600'>
            {/* ... */}
            <div>
              Author:
              <Button href='mailto:guosw5@lenovo.com?subject=Vantage Dev Tools Suggestions' type='link'>
                guosw5@lenovo.com
              </Button>
            </div>
          </Card>
        </Badge.Ribbon>

        <Card hoverable headStyle={{ background: 'rgba(0, 0, 0, 0.02)' }} title='Tools' className='w-600'>
          <Space>
            <VantageBin action='start' />
            <VantageBin action='stop' />
            <VantageBin action='reboot' />
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default Advanced;