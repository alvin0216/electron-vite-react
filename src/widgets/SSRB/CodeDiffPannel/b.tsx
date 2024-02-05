import React, { useMemo, useState } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import PannelRight from '@/widgets/CommandTools/PannelRight';
import DynamicStrForm from '@/components/DynamicStrForm';
import { Button } from 'antd';

const template = 'cd [repo]\ngit diff [tagA] [tagB] -- . [excludePattern] > [repoName]-[v1]-[v2].diff';

const CodeDiffPannel: React.FC = () => {
  const [vars, setVars] = useState({ excludePattern: ':!package.json' });

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
        variables: { excludePattern: ':!package.json' },
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

const packageJsonPath = 'C:\\Users\\guosw5\\Desktop\\codes\\ui-consumer\\packages\\vantage-ui-consumer';
const nextBranch = 'release/vantage2401';
const prevBranch = 'release/vantage2311';
const excludePattern = ':!package-lock.json';
const prevVersion = '1.0.2001';
const nextVersion = '1.0.2000';

const shell = `cd ${packageJsonPath}\ngit diff ${nextBranch} ${prevBranch} -- ${excludePattern}> ${prevVersion}-${nextVersion}.diff`;
