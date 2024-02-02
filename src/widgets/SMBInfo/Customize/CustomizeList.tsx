import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import { StorgeEnum } from '@constants/storage';
import { useLocalStorageState } from 'ahooks';
import { Button, Form, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const CustomizeList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // const [dataSource, setDataSource] = useState<readonly SNItem[]>([]);
  const [snList, setSnList] = useLocalStorageState<SNItem[]>(StorgeEnum.SnList, { defaultValue: [] });
  const [dataSource, setDataSource] = [snList, setSnList];
  const [form] = Form.useForm();
  const handleCreate = () => actionRef.current?.addEditRecord?.({ id: Date.now(), sn: '', desc: '' });

  const columns: ProColumns<SNItem>[] = [
    {
      title: 'Serial Number',
      dataIndex: 'sn',
      formItemProps: { rules: [{ required: true }] },
      width: '30%',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      width: '20%',
      formItemProps: { rules: [{ required: true }] },
    },

    {
      title: 'Opration',
      valueType: 'option',
      width: 250,
      render: (text, record, _, action) => [
        <Button
          key='editable'
          type='link'
          onClick={() => {
            action?.startEditable?.(record.id);
          }}>
          edit
        </Button>,

        <Button
          key='delete'
          type='link'
          danger
          onClick={() => {
            const tableDataSource = form.getFieldValue('table') as SNItem[];
            form.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record?.id),
            });
          }}>
          delete
        </Button>,

        <EditableProTable.RecordCreator key='copy' record={{ ...record, id: Date.now() }}>
          <a>copy</a>
        </EditableProTable.RecordCreator>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<SNItem>
        rowKey='id'
        scroll={{ x: 960 }}
        actionRef={actionRef}
        headerTitle={[
          <Button key='create' type='primary' onClick={handleCreate} icon={<PlusOutlined />}>
            Create a new one
          </Button>,
        ]}
        maxLength={5}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async () => {
            await waitTime(200);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel, dom.delete],
        }}
      />
      <ProCard title='List' headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{ style: { width: '100%' } }}
          mode='read'
          valueType='jsonCode'
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default CustomizeList;
