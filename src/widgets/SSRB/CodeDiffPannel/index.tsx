import { Descriptions } from 'antd';
import CodeDiffForm from './CodeDiffForm';

interface CodeDiffProps {}

const CodeDiff: React.FC<CodeDiffProps> = () => {
  return (
    <Descriptions
      bordered
      className='w-full overscroll-x-auto'
      column={1}
      items={[
        {
          key: '1',
          label: 'UserName',
          children: <CodeDiffForm />,
        },
        {
          key: '2',
          label: 'Telephone',
          children: <p>1810000000</p>,
        },
        {
          key: '3',
          label: 'Live',
          children: <p>Hangzhou, Zhejiang</p>,
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
