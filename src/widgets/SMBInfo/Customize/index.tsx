import { SettingOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Button, Drawer, Segmented, Tooltip } from 'antd';
import { useState } from 'react';
import CustomizeList from './CustomizeList';

enum TabEnum {
  Sn = 'serial number',
  Mtm = 'mtm',
}

const Customize: React.FC = () => {
  const [modalVisible, { setTrue, setFalse }] = useBoolean(false);
  const [tabKey, setTabKey] = useState(TabEnum.Sn);

  return (
    <>
      <Tooltip title='Customize'>
        <Button icon={<SettingOutlined />} onClick={setTrue} />
      </Tooltip>
      <Drawer title='Customize SMBInfo Pannel' open={modalVisible} onClose={setFalse} placement='top' height='100vh'>
        <CustomizeList />
      </Drawer>
    </>
  );
};

export default Customize;
