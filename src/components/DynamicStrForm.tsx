import { ProDescriptions } from '@ant-design/pro-components';
import { useMemo } from 'react';

interface DynamicStrFormProps {
  template: string;
  value?: any;
  onChange?: (v: any) => void;
}

const DynamicStrForm: React.FC<DynamicStrFormProps> = ({ value, onChange, template }) => {
  const keyList = useMemo(() => {
    const regex = /\[(.*?)\]/g;
    const list = template.match(regex) || [];
    return [...new Set(list)];
  }, [template]);

  return (
    <ProDescriptions
      className='ml-12'
      column={1}
      layout='horizontal'
      dataSource={value}
      editable={{
        onSave: async (key, obj) => {
          onChange?.({ ...value, ...obj });
          return true;
        },
      }}
      columns={keyList.map((v) => ({ title: v, dataIndex: v }))}></ProDescriptions>
  );
};

export default DynamicStrForm;
