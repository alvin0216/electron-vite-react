import { Descriptions } from 'antd';
import CodeDiffForm from './CodeDiffForm';
import Terminal from './Terminal';
import { CodeDiffContext, useInitialCodeDiffCtx } from '@/contexts/CodeDiffContext';
import DiffResult from './DiffResult';

interface CodeDiffProps {}

const CodeDiff: React.FC<CodeDiffProps> = () => {
  const ctx = useInitialCodeDiffCtx();
  return (
    <CodeDiffContext.Provider value={ctx as any}>
      <Descriptions
        contentStyle={{ display: 'flex' }}
        layout='vertical'
        bordered
        className='w-full overflow-hidden'
        column={2}
        items={[
          {
            key: 'Options',
            label: 'Options',
            children: <CodeDiffForm />,
            span: 1,
          },

          {
            key: 'Command',
            label: 'Command',
            style: { display: 'flex' },
            children: <Terminal />,
            span: 1,
          },
          {
            key: 'Result',
            label: 'Result',
            children: <DiffResult />,
          },
        ]}
      />
    </CodeDiffContext.Provider>
  );
};

export default CodeDiff;
