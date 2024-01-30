import { AutoComplete, Button, Space, Tag, Tooltip } from 'antd';
import { DragOutlined, SortAscendingOutlined, RedoOutlined } from '@ant-design/icons';

interface RegionSettingProps {}

const RegionSetting: React.FC<RegionSettingProps> = (props) => {
  return (
    <>
      <div className='mb-4'>
        <Space>
          <Tooltip title='Free sorting by drag'>
            <Button
              icon={<DragOutlined />}
              // type={sortable ? 'primary' : 'dashed'}
              // onClick={() => setSortable((prev) => !prev)}
            />
          </Tooltip>
          <Tooltip title='按字母排序'>
            <Button icon={<SortAscendingOutlined />} />
          </Tooltip>
          <Tooltip title='切换中文显示'>{/* <Button icon={<TranslateIcon />} /> */}</Tooltip>

          <Tooltip title='Refresh your computer info'>
            <Button icon={<RedoOutlined />} />
          </Tooltip>

          <AutoComplete allowClear placeholder='Enter country name or abbreviation to filter' className='w-200' />
        </Space>
      </div>
    </>
  );
};

export default RegionSetting;
