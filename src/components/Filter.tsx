import ServiceController from '@/components/ServiceController';
import SNSelector from '@/widgets/SMBInfo/Selector';
import { SettingOutlined } from '@ant-design/icons';
import { Alert, Badge, Button, Select, Space, Switch, Typography } from 'antd';
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
  const [keys, setKeys] = useState<string[]>([]);

  const isRenderResult = keys.length > 0;

  const options = useMemo(() => {
    return Object.keys(json)
      .sort()
      .map((value) => ({ value }));
  }, [json]);

  const renderResult = (key: string) => {
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
    <>
      <Space wrap>
        <Select
          mode='multiple'
          showSearch
          className='w-260'
          placeholder='input search text'
          allowClear
          options={options}
          value={keys}
          onChange={setKeys}
        />
        {children}
        <ServiceController action='reboot' />
      </Space>

      {isRenderResult && (
        <Alert
          key={keys.join(',')}
          className='mt-4'
          message='Search Result'
          type='info'
          closable
          description={keys.map((key) => (
            <div key={key}>{renderResult(key)}</div>
          ))}
        />
      )}
    </>
  );
};

export default Filter;
