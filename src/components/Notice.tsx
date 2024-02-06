import { useCloudConfig } from '@/hooks/useCloudConfig';
import { useIpc } from '@/hooks/useIpc';
import { NotificationOutlined } from '@ant-design/icons';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { Alert, Button } from 'antd';

interface NoticeProps {}

const Notice: React.FC<NoticeProps> = (props) => {
  const { send } = useIpc();
  const { isLastest, downloadUrl, lastestVersion } = useCloudConfig();

  // return null;
  if (isLastest) return null;
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
