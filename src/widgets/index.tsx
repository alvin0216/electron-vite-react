import { useIpcListener } from '@/hooks/useIpcListener';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EnvTools from './EnvTools';
import SMBInfo from './SMBInfo';
import Hypothesis from './Hypothesis';
import PCSetting from './PCSetting';

const items: TabsProps['items'] = [
  {
    key: 'SMBInfo',
    label: 'SMBInfo',
    children: <SMBInfo />,
  },
  {
    key: 'EnvTools',
    label: 'EnvTools',
    children: <EnvTools />,
  },

  {
    key: 'Hypothesis',
    label: 'Hypothesis',
    children: <Hypothesis />,
  },
  {
    key: 'PCSetting',
    label: 'PC Setting',
    children: <PCSetting />,
  },
];

const Widgets: React.FC = () => {
  useIpcListener();

  return <Tabs className='main-tabs' size='large' items={items} />;
};

export default Widgets;
