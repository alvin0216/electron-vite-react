import React from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import PannelRight from '@/widgets/CommandTools/PannelRight';

const App: React.FC = () => (
  <ProDescriptions
    editable={{}}
    // title='Use for generate code diff files'
    column={2}
    layout='vertical'
    bordered
    dataSource={{
      template: 'cd [repo]\ngit diff [tagA] [tagB] -- . ":!package.json" > [repo]/[v1]-[v2].diff',
    }}
    columns={[
      {
        title: 'Terminal Template',
        dataIndex: 'template',
        copyable: true,
        span: 1,
        valueType: 'code',
      },

      {
        title: 'Environment variables',
        dataIndex: 'variables',
        editable: false,
        span: 2,
        render: (text, row) => {
          return null;
        },
      },

      {
        title: 'Command',
        dataIndex: 'command',
        copyable: true,
        editable: false,
        span: 1,
        valueType: 'code',
      },
    ]}
  />
);

export default App;
