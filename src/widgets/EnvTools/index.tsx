import { Segmented, Space } from 'antd';
import { useState } from 'react';
import Configurator from './Configurator';

interface EnvToolsProps {}

const EnvTools: React.FC<EnvToolsProps> = (props) => {
  const [tabKey, setTabKey] = useState('Filter');

  return <Configurator />;
  return (
    <Space className='mb-4'>
      <Segmented
        value={tabKey}
        onChange={(v) => setTabKey(v as string)}
        options={[
          { label: 'Kanban', value: 'Kanban' },
          { label: 'Filter', value: 'Filter' },
        ]}
      />

      {/* <Tooltip title='Customize'>
    <Button icon={<SettingOutlined />} onClick={setTrue} />
  </Tooltip>
  <Tooltip title='Restart Service'>
    <Badge dot>
      <Button icon={<PoweroffOutlined />} />
    </Badge>
  </Tooltip> */}
    </Space>
  );
};

export default EnvTools;
