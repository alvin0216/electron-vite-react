import { useIpc } from '@/hooks/useIpc';
import { FolderOpenOutlined, IeOutlined } from '@ant-design/icons';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { resourcePath } from '@constants/resource';
import { Button, Space } from 'antd';

interface ListProps {}

const LinkList: React.FC<ListProps> = () => {
  const { send } = useIpc();

  const list = [
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
      {list.map((item, index) => (
        <div key={index}>
          <Button
            className='pl-0'
            icon={item.icon}
            type='link'
            onClick={() => {
              send(IPCEnum.Open, { type: OpenTypeEnum.Url, link: item.link });
            }}>
            {item.text}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default LinkList;
