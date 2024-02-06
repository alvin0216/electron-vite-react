import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { StorgeEnum } from '@constants/storage';
import { Button, Space } from 'antd';
interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const cacheKeys = Object.values(StorgeEnum);


  
  return (
    <>
      <div className='c-gray mb-24'>Mainly used to quickly migrate your usage data</div>

      <Space>
        <Button icon={<ExportOutlined />}>Export</Button>
        <Button type='primary' icon={<ImportOutlined />}>
          Import
        </Button>
      </Space>
    </>
  );
};
export default UserProfile;
