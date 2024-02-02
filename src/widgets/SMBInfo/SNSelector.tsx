import { AppstoreAddOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Button, Divider, Drawer, Input, Modal, Select, Space } from 'antd';

interface SNSelectorProps {}

const SNSelector: React.FC<SNSelectorProps> = (props) => {
  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

  const [modalVisible, { setTrue, setFalse }] = useBoolean(false);

  return (
    <>
      <Select
        className='w-200'
        placeholder='Select a serial number'
        options={OPTIONS.map((item) => ({
          value: item,
          label: `${item}(${item})`,
        }))}
      />
    </>
  );
};

export default SNSelector;
