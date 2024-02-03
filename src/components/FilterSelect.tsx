import { Select } from 'antd';
import { useMemo } from 'react';

interface FilterSelectProps {
  json: any;
  value?: string[];
  onChange: any;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, json, onChange }) => {
  const options = useMemo(() => {
    return Object.keys(json)
      .sort()
      .map((value) => ({ value }));
  }, [json]);

  return (
    <Select
      className='min-w-260'
      mode='multiple'
      showSearch
      placeholder='input search text'
      allowClear
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default FilterSelect;
