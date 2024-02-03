import { AppstoreOutlined, BarsOutlined, CodeOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import CodeDiffPannel from './CodeDiffPannel';

interface SSRBProps {}

const SSRB: React.FC<SSRBProps> = (props) => {
  return (
    <>
      <Segmented
        options={[
          { label: 'Code diff', value: 'Kanban', icon: <CodeOutlined /> },
          { label: 'Md5', value: 'Filter', icon: <BarsOutlined /> },
        ]}
      />

      <div className='mt-24'>
        <CodeDiffPannel />
      </div>
    </>
  );
};

export default SSRB;
