import { useService } from '@/hooks/useService';
import { Badge, Button } from 'antd';

interface IProps {
  action: ServiceAction;
}

const VantageBin: React.FC<IProps> = ({ action }) => {
  const { running, dot, run, disabled } = useService(action);

  return (
    <Badge dot={dot}>
      <Button
        type={action !== 'stop' ? 'primary' : 'default'}
        loading={running}
        onClick={run}
        className='capitalize'
        danger={action === 'stop'}
        disabled={disabled}>
        {action} Service
      </Button>
    </Badge>
  );
};

export default VantageBin;
