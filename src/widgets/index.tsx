import { useIpcListener } from '@/hooks/useIpcListener';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CommandTools from './CommandTools';
import EnvTools from './EnvTools';

const items: TabsProps['items'] = [
  {
    key: 'envTools',
    label: 'EnvTools',
    children: <EnvTools />,
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
