import { AutoComplete, Button, Space, Tag, Tooltip } from 'antd';
import { DragOutlined, SortAscendingOutlined, RedoOutlined } from '@ant-design/icons';
import { useBoolean, useLocalStorageState, useToggle } from 'ahooks';
import RegionList from './RegionList';
import { StorgeEnum } from '@enum/storage';

interface RegionSettingProps {}

const RegionSetting: React.FC<RegionSettingProps> = (props) => {
  const [sortable, { toggle: toggleSortable }] = useBoolean(false);

  const [display, setDisplay] = useLocalStorageState(StorgeEnum.RegionDisplay, {
    defaultValue: 'en',
  });

  const displayEn = display === 'en';
  const toggleDisplay = () => setDisplay(displayEn ? 'cn' : 'en');

  return (
    <>
      <div className='mb-6'>
        <Space>
          <Tooltip title={sortable ? 'Stop sorting' : 'Start sorting'}>
            <Button icon={<DragOutlined />} type={sortable ? 'primary' : 'dashed'} onClick={toggleSortable} />
          </Tooltip>

          <Tooltip title={displayEn ? 'English' : '中文（简体）'}>
            <Button icon={displayEn ? 'EN' : '中'} onClick={toggleDisplay} />
          </Tooltip>

          <Tooltip title='Refresh your computer info'>
            <Button icon={<RedoOutlined />} />
          </Tooltip>

          <AutoComplete allowClear placeholder='Enter country name or abbreviation to filter' className='w-200' />
        </Space>
      </div>
      <RegionList sortable={sortable} displayEn={displayEn} />
    </>
  );
};

export default RegionSetting;
