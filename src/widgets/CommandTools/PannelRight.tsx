import { ProDescriptions } from '@ant-design/pro-components';

interface PannelRightProps {
  row: CmdItem;
  onChange(variables: StringObject): void;
}

const PannelRight: React.FC<PannelRightProps> = ({ row, onChange }) => {
  const { variables } = row;
  return (
    <ProDescriptions
      className='ml-12'
      title='Environment variables'
      column={1}
      layout='horizontal'
      dataSource={variables}
      editable={{
        onSave: async (keypath, newInfo) => {
          onChange(newInfo);
          return true;
        },
      }}
      columns={Object.keys(variables).map((v) => ({ title: v, dataIndex: v }))}></ProDescriptions>
  );
};

export default PannelRight;
