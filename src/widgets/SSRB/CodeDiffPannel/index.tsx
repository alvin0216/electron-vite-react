import React, { useMemo, useState } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import PannelRight from '@/widgets/CommandTools/PannelRight';
import DynamicStrForm from '@/components/DynamicStrForm';
import { Button } from 'antd';

const template = 'cd [repo]\ngit diff [tagA] [tagB] -- . ":!package.json" > [repo]/[v1]-[v2].diff';
const CodeDiffPannel: React.FC = () => {
  const [vars, setVars] = useState({});

  const execStr = useMemo(() => {
    let execStr = template;
    Object.entries(vars).forEach(([key, value]) => {
      // @ts-ignore
      execStr = execStr.split(key).join(value);
    });
    return execStr;
  }, [template, vars]);

  return (
    <ProDescriptions
      className='w-full overscroll-x-auto'
      column={1}
      bordered
      dataSource={{
        template,
        variables: {},
        execStr,
      }}
      columns={[
        {
          title: 'Terminal Template',
          dataIndex: 'template',
          copyable: true,
          editable: false,
          valueType: 'jsonCode',
        },

        {
          title: 'ExecStr',
          dataIndex: 'execStr',
          copyable: true,
          editable: false,
          valueType: 'code',
          renderText: (text) => execStr,
        },

        {
          title: 'Environment variables',
          dataIndex: 'variables',
          render: (text, row) => {
            return <DynamicStrForm template={row.template} value={vars} onChange={setVars} />;
          },
        },

        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, row) => {
            return <Button type='primary'>Run</Button>;
          },
        },
      ]}
    />
  );
};

export default CodeDiffPannel;
