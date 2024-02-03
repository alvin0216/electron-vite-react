import { useIpcListener } from '@/hooks/useIpcListener';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EnvTools from './EnvTools';
import SMBInfo from './SMBInfo';
import Hypothesis from './Hypothesis';
import PCSetting from './PCSetting';
import Translation from './Translation';
import Advanced from './Advanced';
import CommandTools from './CommandTools';
import SSRB from './SSRB';

const items: TabsProps['items'] = [
  {
    key: 'SSRB',
    label: 'SSRB',
    children: <SSRB />,
  },
  {
    key: 'CommandTools',
    label: 'Terminal',
    children: <CommandTools />,
  },
  {
    key: 'Advanced',
    label: 'Advanced',
    children: <Advanced />,
  },
  {
    key: 'Translation',
    label: 'Translation',
    children: <Translation />,
  },
  {
    key: 'Hypothesis',
    label: 'Hypothesis',
    children: <Hypothesis />,
  },
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
