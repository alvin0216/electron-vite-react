import { useIpc } from '@/hooks/useIpc';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { Button } from 'antd';

interface ListProps {}

const list = [];

const LinkList: React.FC<ListProps> = () => {
  const { send } = useIpc();

  return (
    <Button
      type='primary'
      onClick={() => {
        send(IPCEnum.Open, {
          type: OpenTypeEnum.Url,
          // link: '%localappdata%/Packages/E046963F.LenovoCompanion_k1h2ywk1493x8/LocalState/Logs/LenovoVantage',
          link: '\\\\10.176.36.49\\vantage\\test\\Build\\Vantage3.0\\Consumer Build',
        });
      }}>
      List
    </Button>
  );
};

export default LinkList;
