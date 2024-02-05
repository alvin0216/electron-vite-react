import { Descriptions } from 'antd';
import CodeDiffForm from './CodeDiffForm';
import Terminal from './Terminal';

interface CodeDiffProps {}

const CodeDiff: React.FC<CodeDiffProps> = () => {
  return (
    <Descriptions
      layout='vertical'
      bordered
      className='w-full overscroll-x-auto'
      column={2}
      items={[
        {
          key: 'repo',
          label: 'Repo path',
          children: <CodeDiffForm />,
        },

        {
          key: '3',
          label: 'Live',
          children: <Terminal />,
        },
        {
          key: '4',
          label: 'Remark',
          children: <p>empty</p>,
        },
        {
          key: '5',
          label: 'Address',
          children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
        },
      ]}
    />
  );
};

export default CodeDiff;
