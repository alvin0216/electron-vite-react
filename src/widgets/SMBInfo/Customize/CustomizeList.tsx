import { useSMBCache } from '@/hooks/useSMBCache';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import { StorgeEnum } from '@constants/storage';
import { Badge, Button, Form, Popconfirm, Segmented, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

const CustomizeList: React.FC = () => {
  const [tabKey, setTabKey] = useState(StorgeEnum.SnList);
  const { snList, mtmList, setSnList, setMtmList } = useSMBCache();

  const isShowSN = tabKey === StorgeEnum.SnList;

  const dataSource = isShowSN ? snList : mtmList;
  const setDataSource = (list: any) => {
    if (isShowSN) {
      setSnList(
        list.map(({ id, sn, desc }: any) => {
          return { id, sn, desc };
        })
      );
    } else {
      setMtmList(
        list.map(({ id, mtm, desc }: any) => {
          return { id, mtm, desc };
        })
      );
    }
  };

  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [form] = Form.useForm();
  const handleCreate = () => actionRef.current?.addEditRecord?.({ id: Date.now(), sn: '', desc: '' });

  const columns: ProColumns<SMBCacheItem>[] = [
    {
      title: 'Serial Number',
      dataIndex: 'sn',
      formItemProps: { rules: [{ required: true }] },
      width: '30%',
      hidden: !isShowSN,
    },
    {
      title: 'Mtm',
      dataIndex: 'mtm',
      formItemProps: { rules: [{ required: true }] },
      width: '30%',
      hidden: isShowSN,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      width: '20%',
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
        <Popconfirm
          key='delete'
          title='Delete the item'
          description='Are you sure to delete this item?'
          onConfirm={() => {
            setDataSource(dataSource.filter((item) => item.id !== record?.id));
          }}
          okText='Yes'
          cancelText='No'>
          <Button type='link' danger>
            delete
          </Button>
        </Popconfirm>,
        <EditableProTable.RecordCreator key='copy' record={{ ...record, id: Date.now() }}>
          <a>copy</a>
        </EditableProTable.RecordCreator>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<SMBCacheItem>
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: tabKey,
            onChange: (key) => setTabKey(key as StorgeEnum),
            items: [
              {
                key: StorgeEnum.SnList,
                label: <span>SerialNumber{renderBadge(snList.length, isShowSN)}</span>,
              },
              { key: StorgeEnum.MtmList, label: <span>Mtm{renderBadge(mtmList.length, !isShowSN)}</span> },
            ],
          },
          actions: [
            <Button key='create' type='primary' onClick={handleCreate} icon={<PlusOutlined />}>
              Add item
            </Button>,
          ],
        }}
        rowKey='id'
        scroll={{ x: 960 }}
        actionRef={actionRef}
        maxLength={5}
        recordCreatorProps={false}
        columns={columns}
        value={dataSource}
        // @ts-ignore
        onChange={setDataSource}
        editable={{
          form,
          editableKeys,
          onSave: async () => true,
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel, dom.delete],
        }}
      />
    </>
  );
};

export default CustomizeList;
