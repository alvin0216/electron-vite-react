import { useIpc } from '@/hooks/useIpc';
import { NotificationOutlined } from '@ant-design/icons';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { resourcePath } from '@constants/resource';
import { useRequest } from 'ahooks';
import { Alert, Button } from 'antd';
import axios from 'axios';

interface NoticeProps {}

const Notice: React.FC<NoticeProps> = (props) => {
  const { send } = useIpc();
  const { data } = useRequest(
    () => axios.get(`${resourcePath.releaseJson}?v=${Date.now()}`) as Promise<{ data: ReleaseInfo }>,
    {
      // 2 hours 
      pollingInterval: 7200000,
    }
  );

  const lastestVersion = data?.data.version;
  const downloadUrl = data?.data.downloadUrl;

  const isLastest = lastestVersion && lastestVersion === APP_VERSION;

  if (isLastest) return null;

  // return null;
  return (
    <div className='px-24 my-16'>
      <Alert
        closable
        message={`The software version has been updated to v${lastestVersion}, please download to experience it! `}
        type='info'
        showIcon
        icon={<NotificationOutlined />}
        action={
          downloadUrl && (
            <Button
              size='small'
              type='link'
              onClick={() => {
                send(IPCEnum.Open, { type: OpenTypeEnum.Url, link: downloadUrl });
              }}>
              Download
            </Button>
          )
        }
      />
    </div>
  );
};

export default Notice;
