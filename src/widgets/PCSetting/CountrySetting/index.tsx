import { AutoComplete, Button, Select, Space, Tooltip } from 'antd';
import { DragOutlined, RedoOutlined } from '@ant-design/icons';
import Countries from './Countries';
import { usePCSetting } from '@/hooks/usePCSetting';

const CountrySetting: React.FC = () => {
  const { displayEn, toggleDisplay, sortable, toggleSortable } = usePCSetting();

  return (
    <>
      <div className='mb-6'>
        <Space>
          <Tooltip title={sortable ? 'Sortable' : 'Not Sortable'}>
            <Button icon={<DragOutlined />} type={sortable ? 'primary' : 'dashed'} onClick={toggleSortable} />
          </Tooltip>

          <Tooltip title={displayEn ? 'English' : '中文（简体）'}>
            <Button icon={displayEn ? 'EN' : '中'} onClick={toggleDisplay} />
          </Tooltip>

          <Tooltip title='Refresh your computer info'>
            <Button icon={<RedoOutlined />} />
          </Tooltip>

          <Select allowClear placeholder='Enter country name or abbreviation to filter' className='w-200' />
        </Space>
      </div>
      <Countries />
    </>
  );
};

export default CountrySetting;
