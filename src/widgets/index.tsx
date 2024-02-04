import { useIpcListener } from '@/hooks/useIpcListener';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EnvTools from './EnvTools';
import SMBInfo from './SMBInfo';
import Hypothesis from './Hypothesis';
import PCSetting from './PCSetting';
import Translation from './Translation';
import Advanced from './Advanced';
// import CommandTools from './CommandTools';
import SSRB from './SSRB';
import { useLocalStorageState } from 'ahooks';
import { StorgeEnum } from '@constants/storage';

const Widgets: React.FC = () => {
  useIpcListener();

  const [tab, setTab] = useLocalStorageState(StorgeEnum.TabKey, { defaultValue: 'EnvTools' });

  return (
    <Tabs
      activeKey={tab}
      onChange={setTab}
      className='main-tabs'
      size='large'
      items={[
        { key: 'EnvTools', label: 'EnvTools', children: <EnvTools /> },
        { key: 'PCSetting', label: 'PCSetting', children: <PCSetting /> },
        { key: 'SMBInfo', label: 'SMBInfo', children: <SMBInfo /> },
        { key: 'Hypothesis', label: 'Hypothesis', children: <Hypothesis /> },
        { key: 'Translation', label: 'Translation', children: <Translation /> },
        { key: 'SSRB', label: 'SSRB', children: <SSRB /> },
        // { key: 'CommandTools', label: 'Terminal', children: <CommandTools /> },
        { key: 'Advanced', label: 'Advanced', children: <Advanced /> },
      ]}
    />
  );
};

export default Widgets;
