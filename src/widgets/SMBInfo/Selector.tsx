import { useSMBCache } from '@/hooks/useSMBCache';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, Tag } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

interface SelectorProps {
  value: string;
  onChange: (sn: string) => void;
}

export const SNSelector: React.FC<SelectorProps> = ({ value, onChange }) => {
  const { snList, setSnList } = useSMBCache();

  const options = snList.map((item) => ({
    value: item.id,
    label: (
      <Space>
        <span>{item.sn}</span>
        {item.desc && <span className='c-gray'>({item.desc})</span>}
      </Space>
    ),
  }));
  const _value = snList.find((s) => s.sn === value)?.id || value;

  return (
    <Select
      suffixIcon={<Tag color='cyan'>Sn</Tag>}
      className='w-260'
      placeholder='Select a serial number'
      options={options}
      value={_value}
      onChange={(val) => {
        onChange(snList.find((s) => s.id === val)?.sn!);
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <AddItem onAdd={(sn) => setSnList([...snList, { id: Date.now(), sn }])} />
        </>
      )}
    />
  );
};

export const MtmSelector: React.FC<SelectorProps> = ({ value, onChange }) => {
  const { mtmList, setMtmList } = useSMBCache();

  const options = mtmList.map((item) => ({
    value: item.id,
    label: (
      <Space>
        <span>{item.mtm}</span>
        {item.desc && <span className='c-gray'>({item.desc})</span>}
      </Space>
    ),
  }));
  const _value = mtmList.find((s) => s.mtm === value)?.id || value;

  return (
    <Select
      suffixIcon={<Tag color='cyan'>Mtm</Tag>}
      className='w-260'
      placeholder='Select a Mtm'
      options={options}
      value={_value}
      onChange={(val) => {
        onChange(mtmList.find((s) => s.id === val)?.mtm!);
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <AddItem onAdd={(mtm) => setMtmList([...mtmList, { id: Date.now(), mtm }])} />
        </>
      )}
    />
  );
};

interface AddItemProps {
  onAdd(v: string): void;
}
const AddItem: React.FC<AddItemProps> = ({ onAdd }) => {
  const [value, setValue] = useState<string>();

  return (
    <>
      <Divider className='my-8' />
      <Space>
        <Input
          placeholder='Please enter item'
          value={value}
          onKeyDown={(e) => e.stopPropagation()}
          allowClear
          onChange={(e) => setValue(e.target.value.trim())}
        />
        <Button
          disabled={value === undefined || value?.trim().length === 0}
          type='text'
          icon={<PlusOutlined />}
          onClick={() => {
            onAdd(value!);
            setValue(undefined);
          }}>
          Add item
        </Button>
      </Space>
    </>
  );
};
