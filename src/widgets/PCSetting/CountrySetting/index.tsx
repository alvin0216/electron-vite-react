import { AutoComplete, Button, Space, Tag, Tooltip } from 'antd';
import { DragOutlined, SortAscendingOutlined, RedoOutlined } from '@ant-design/icons';
import { useBoolean, useLocalStorageState, useToggle } from 'ahooks';
import Countries from './Countries';
import { StorgeEnum } from '@constants/storage';

const CountrySetting: React.FC = () => {
  const [sortable, { toggle: toggleSortable }] = useBoolean(false);

  const [show, setShow] = useLocalStorageState(StorgeEnum.CountryShow, {
    defaultValue: 'en',
  });

  const showEn = show === 'en';
  const toggleShow = () => setShow(showEn ? 'cn' : 'en');

  return (
    <>
      <div className='mb-6'>
        <Space>
          <Tooltip title={sortable ? 'Stop sorting' : 'Start sorting'}>
            <Button icon={<DragOutlined />} type={sortable ? 'primary' : 'dashed'} onClick={toggleSortable} />
          </Tooltip>

          <Tooltip title={showEn ? 'English' : '中文（简体）'}>
            <Button icon={showEn ? 'EN' : '中'} onClick={toggleShow} />
          </Tooltip>

          <Tooltip title='Refresh your computer info'>
            <Button icon={<RedoOutlined />} />
          </Tooltip>

          <AutoComplete allowClear placeholder='Enter country name or abbreviation to filter' className='w-200' />
        </Space>
      </div>
      <Countries sortable={sortable} showEn={showEn} />
    </>
  );
};

export default CountrySetting;
