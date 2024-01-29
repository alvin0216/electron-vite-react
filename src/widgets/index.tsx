import { useIpcListener } from '@/hooks/useIpcListener';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CommandTools from './CommandTools';
import Configurator from './Configurator';

const items: TabsProps['items'] = [
  {
    key: 'Configurator',
    label: 'Configurator',
    children: <Configurator />,
  },
  {
    key: 'commandTools',
    label: 'CommandTools',
    children: <CommandTools />,
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const Widgets: React.FC = () => {
  useIpcListener();

  return <Tabs className='main-tabs' size='large' items={items} />;
};

export default Widgets;
