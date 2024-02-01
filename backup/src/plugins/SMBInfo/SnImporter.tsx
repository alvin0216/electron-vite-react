import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import "./SnImporter.css";
import { send } from "@/lib/bridge";
import { EMCEnum } from "@universal/enum";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof SnItem;
  record: SnItem;
  handleSave: (record: SnItem) => void;
}

const EditableCell: React.FC<EditableCellProps> = (props) => {
  const {
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  } = props;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface SnImporterProps {
  list: SnListItem[];
  setList: (list: SnListItem[]) => void;
}

const SnImporter: React.FC<SnImporterProps> = (props) => {
  const { list, setList } = props;

  const handleDelete = (idx: number) => {
    const newList = props.list.filter((item, index) => index !== idx);
    setList(newList);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Remark",
      dataIndex: "remark",
      width: "30%",
      editable: true,
    },
    {
      title: "SerialNumber",
      dataIndex: "serialNumber",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record, index) =>
        list.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(index)}
          >
            <a className="c-red hover:c-red">Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    setList([
      ...list,
      { remark: "Test1", serialNumber: "mocksn", key: list.length },
    ]);
  };

  const handleSave = (row: any) => {
    const newData = [...list];
    const rowIndex = row.key;
    const item = newData[rowIndex];
    newData.splice(rowIndex, 1, { ...item, ...row });
    setList(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: SnItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className="mt-xl">
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Button onClick={() => send(EMCEnum.OPEN_CACHE_FILE)} className="ml-8">
        Open Cache
      </Button>
      <Table
        size="small"
        pagination={{
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={list}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default SnImporter;
