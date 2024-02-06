import { useCloudConfig } from '@/hooks/useCloudConfig';
import { useIpc } from '@/hooks/useIpc';
import { CloudDownloadOutlined, FolderOpenOutlined, IeOutlined } from '@ant-design/icons';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { resourcePath } from '@constants/resource';
import { Button, Space } from 'antd';

interface ListProps {}

const LinkList: React.FC<ListProps> = () => {
  const { send } = useIpc();
  const { downloadUrl } = useCloudConfig();

  const list = [
    {
      text: 'Download Url',
      link: downloadUrl,
      icon: <CloudDownloadOutlined />,
    },
    {
      text: 'DevTools WebSite',
      link: resourcePath.devToolsWebSite,
      icon: <IeOutlined />,
    },
    {
      text: 'TestBench',
      link: resourcePath.testBench,
      icon: <IeOutlined />,
    },
    {
      text: 'Metrics',
      link: resourcePath.metrics,
      icon: <FolderOpenOutlined />,
    },
    {
      text: 'Shell',
      link: resourcePath.shell,
      icon: <FolderOpenOutlined />,
    },
    {
      text: 'Logs',
      link: resourcePath.logs,
      icon: <FolderOpenOutlined />,
    },
  ];

  return (
    <div>
      {list.map(({ icon, text, link }, index) => {
        if (!link) return null;
        return (
          <div key={index}>
            <Button
              className='pl-0'
              icon={icon}
              type='link'
              onClick={() => {
                send(IPCEnum.Open, { type: OpenTypeEnum.Url, link });
              }}>
              {text}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default LinkList;
