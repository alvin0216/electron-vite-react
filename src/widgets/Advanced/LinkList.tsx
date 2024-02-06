import { useIpc } from '@/hooks/useIpc';
import { FolderOpenOutlined, IeOutlined } from '@ant-design/icons';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { resourcePath } from '@constants/resource';
import { Button } from 'antd';

interface ListProps {}

const LinkList: React.FC<ListProps> = () => {
  const { send } = useIpc();

  const list = [
    {
      text: 'devToolsWebSite',
      link: resourcePath.devToolsWebSite,
      icon: <IeOutlined />,
    },
    {
      text: 'testBench',
      link: resourcePath.testBench,
      icon: <IeOutlined />,
    },
    {
      text: 'metrics',
      link: resourcePath.metrics,
      icon: <FolderOpenOutlined />,
    },
    {
      text: 'shell',
      link: resourcePath.shell,
      icon: <FolderOpenOutlined />,
    },
    {
      text: 'logs',
      link: resourcePath.logs,
      icon: <FolderOpenOutlined />,
    },
  ];

  return list.map((item, index) => (
    <Button
      key={index}
      icon={item.icon}
      type='link'
      onClick={() => {
        send(IPCEnum.Open, { type: OpenTypeEnum.Url, link: item.link });
      }}>
      {item.text}
    </Button>
  ));
};

export default LinkList;
