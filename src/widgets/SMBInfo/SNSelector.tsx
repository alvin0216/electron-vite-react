import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';

interface SNSelectorProps {}

const SNSelector: React.FC<SNSelectorProps> = (props) => {
  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

  return (
    <>
      <Select
        className='w-200'
        placeholder='Select a serial number'
        options={OPTIONS.map((item) => ({
          value: item,
          label: `${item}(${item})`,
        }))}
        dropdownRender={(menu) => {
          return (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              {/* <Input placeholder='Please enter item' /> */}
            </>
          );
        }}></Select>
      <Select
        className='w-200'
        placeholder='Select a MTM'
        dropdownRender={(menu) => {
          return (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              {/* <Input placeholder='Please enter item' /> */}
            </>
          );
        }}></Select>
    </>
  );
};

export default SNSelector;
