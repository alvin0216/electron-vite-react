import { useLocalStorageState } from 'ahooks';
import { defaultCmdList } from './cmdList';
import { ProList } from '@ant-design/pro-components';
import TerminalIcon from '../../components/Icons/TerminalIcon';
import PannelLeft from './PannelLeft';
import { Key, useState } from 'react';
import PannelRight from './PannelRight';
import { produce } from 'immer';
import './styles.css';

const CommandTools: React.FC = () => {
  // const [cmdList, setCmdList] = useLocalStorageState('cmdList', { defaultValue: defaultCmdList });

  const [cmdList, setCmdList] = useState<CmdItem[]>(defaultCmdList);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

  return (
    <ProList<CmdItem>
      rowKey='id'
      headerTitle='Command List'
      className='command-list'
      dataSource={cmdList}
      onDataSourceChange={(list) => {
        setCmdList(
          produce(list!, (draft) => {
            draft.forEach((target) => {
              const regex = /\[(.*?)\]/g;
              const vars: { [key: string]: string } = {};
              target.template.match(regex)?.forEach((k) => {
                vars[k] = target.variables[k] || '';
              });
              target.variables = vars;
            });
          })
        );
      }}
      expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
      editable={{
        onSave: async () => true,
      }}
      metas={{
        title: { dataIndex: 'title' },
        subTitle: { dataIndex: 'subTitle' },
        avatar: { render: () => <TerminalIcon />, editable: false },
        actions: {
          render: (text, row, index, action) => [
            <a onClick={() => action?.startEditable(row.id)} key='link'>
              编辑
            </a>,
          ],
        },
        content: {
          dataIndex: 'variables',
          editable: false,
          render: (text, row) => (
            <PannelRight
              key={row.template}
              row={row}
              onChange={(variables) => {
                setCmdList(
                  produce(cmdList, (draft) => {
                    const target = draft.find((d) => d.id === row.id)!;
                    target.variables = variables;
                  })
                );
              }}
            />
          ),
        },
        description: {
          dataIndex: 'template',
          fieldProps: { placeholder: 'Please enter template string' },
          render: (text, row) => <PannelLeft row={row} />,
        },
      }}
    />
  );
};

export default CommandTools;
