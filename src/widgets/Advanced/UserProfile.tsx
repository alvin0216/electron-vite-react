import { useIpc } from '@/hooks/useIpc';
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { IPCEnum } from '@constants/enum';
import { StorgeEnum } from '@constants/storage';
import { useRequest } from 'ahooks';
import { Button, Space, message } from 'antd';
interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { invoke } = useIpc();
  const cacheKeys = Object.values(StorgeEnum) as string[];

  const { loading: importing, run: onImport } = useRequest(
    () =>
      invoke(IPCEnum.ImportUserProfile).then((cacheJson) => {
        if (cacheJson) {
          Object.entries(cacheJson).forEach(([key, value]) => {
            if (cacheKeys.includes(key)) {
              localStorage.setItem(key, JSON.stringify(value));
            }
          });
          message.success('Data import successful, the application will restart in 3s');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      }),
    {
      manual: true,
    }
  );

  const { loading: exporting, run: onExport } = useRequest(
    async () => {
      const cacheJson = cacheKeys.reduce((m, key) => {
        try {
          // @ts-ignore
          m[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          return m;
        }
        return m;
      }, {});

      return invoke(IPCEnum.ExportUserProfile, {
        version: APP_VERSION,
        ...cacheJson,
      }).then(() => {
        message.success('Data file successfully exported to desktop');
      });
    },
    { manual: true }
  );

  return (
    <>
      <div className='c-gray mb-24'>Mainly used to quickly migrate your usage data</div>

      <Space>
        <Button icon={<ExportOutlined />} loading={exporting} onClick={onExport}>
          Export
        </Button>
        <Button type='primary' icon={<ImportOutlined />} loading={importing} onClick={onImport}>
          Import
        </Button>
      </Space>
    </>
  );
};
export default UserProfile;
