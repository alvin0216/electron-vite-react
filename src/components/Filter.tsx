import ServiceController from '@/components/ServiceController';
import { Alert, Badge, Select, Space, Switch, Typography } from 'antd';
import { produce } from 'immer';
import { useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
const { Paragraph } = Typography;

interface FilterProps {
  json: any;
  setJson: (newJson: object) => void;
  children?: any;
}

const Filter: React.FC<FilterProps> = ({ json, setJson, children }) => {
  const [key, setKey] = useState<string>();

  const options = useMemo(() => {
    return Object.keys(json)
      .sort()
      .map((value) => ({ value }));
  }, [json]);

  const renderResult = () => {
    if (!key) return null;
    const value = json[key];

    switch (true) {
      // removed
      case value === undefined:
        return (
          <Space>
            {key}: <Badge status='error' text={<span className='c-gray'>Removed</span>} />
          </Space>
        );

      // object
      case typeof value === 'object' && value !== null:
        return <ReactJson name={key} displayDataTypes={false} src={value} />;

      // toggle true & false
      case value === 'true' || value === 'false':
        return (
          <Space>
            {key}:
            <Switch
              checkedChildren='true'
              unCheckedChildren='false'
              checked={value === 'true'}
              onChange={(checked) =>
                setJson(
                  produce(json, (draft: any) => {
                    draft[key] = checked ? 'true' : 'false';
                  })
                )
              }
            />
          </Space>
        );

      default:
        return (
          <Space>
            {key}:
            <Paragraph editable className='!mb-0'>
              {String(value)}
            </Paragraph>
          </Space>
        );
    }
  };

  return (
    <div>
      <Space>
        <Select
          showSearch
          className='w-200'
          placeholder='input search text'
          allowClear
          options={options}
          value={key}
          onChange={setKey}
        />

        <ServiceController action='reboot' />
        {children}
      </Space>

      {key && (
        <Alert key={key} className='mt-4' message='Search Result' type='info' closable description={renderResult()} />
      )}
    </div>
  );
};

export default Filter;
