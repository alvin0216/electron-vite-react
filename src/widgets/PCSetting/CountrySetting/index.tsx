import { Button, Select, Space, Tooltip } from 'antd';
import { DragOutlined, RedoOutlined } from '@ant-design/icons';
import Countries from './Countries';
import { usePCSetting } from '@/hooks/usePCSetting';
import { useState } from 'react';

const CountrySetting: React.FC = () => {
  const { displayEn, toggleDisplay, sortable, toggleSortable, readPCSetting, countryList } = usePCSetting();
  const [code, setCode] = useState();
  const options = countryList.map((c) => ({ value: c.id, label: displayEn ? c.en : c.cn }));

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
            <Button icon={<RedoOutlined />} onClick={readPCSetting} />
          </Tooltip>

          <Select
            showSearch
            allowClear
            placeholder='Set country'
            className='min-w-260'
            options={options}
            onChange={setCode}
          />
        </Space>
      </div>
      <Countries />
    </>
  );
};

export default CountrySetting;
