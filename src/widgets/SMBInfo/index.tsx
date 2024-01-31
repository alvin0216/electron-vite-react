import ServiceController from '@/components/ServiceController';
import { useFile } from '@/hooks/useFile';
import { ProFormInstance, ProFormSelect } from '@ant-design/pro-components';
import { FileKeyEnum } from '@enum/index';
import { Alert, Badge, Button, Select, Space, Switch, Typography } from 'antd';
import { useMemo, useRef, useState } from 'react';
import ReactJson from 'react-json-view';
const { Paragraph } = Typography;

const SMBInfo: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { json, setJson, open } = useFile(FileKeyEnum.smbInfo);
  const [key, setKey] = useState<string>();
  const onSearch = (value: string) => {};

  const options = useMemo(() => {
    return Object.keys(json)
      .sort()
      .map((value) => ({ value }));
  }, [json]);

  const result = useMemo(() => {
    if (!key) return { type: 'not-searched' };
    const value = json[key];
    if (value === undefined) return { type: 'removed' };
    if (typeof value === 'object') return { type: 'object', value };
    return { type: 'string', value: String(value) };
  }, [key, json]);

  const renderContent = () => {
    const { value, type } = result;
    switch (type) {
      case 'not-searched':
        return null;

      case 'string':
        return (
          <Space>
            {key}:
            <Paragraph editable className='!mb-0'>
              {result.value}
            </Paragraph>
            <Switch checkedChildren='true' unCheckedChildren='false' />
          </Space>
        );

      case 'removed':
        return (
          <Space>
            {key}: <Badge status='error' text={<span className='c-gray'>Removed</span>} />
          </Space>
        );

      case 'object':
        return <ReactJson name={key} displayDataTypes={false} src={value} />;

      default:
        return null;
    }
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
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
        </Space>

        {key && (
          <Alert
            key={key}
            className='mt-4'
            message='Search Result'
            type='info'
            closable
            description={renderContent()}
          />
        )}
      </div>

      <ReactJson
        name='smbInfo.json'
        sortKeys
        src={json}
        enableClipboard={false}
        displayDataTypes={false}
        onEdit={(data) => setJson(data.updated_src)}
        onAdd={(data) => setJson(data.updated_src)}
        onDelete={(data) => setJson(data.updated_src)}
      />
    </div>
  );
};

export default SMBInfo;
