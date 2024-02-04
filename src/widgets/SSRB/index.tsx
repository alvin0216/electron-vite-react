import { AppstoreOutlined, BarsOutlined, CodeOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import CodeDiffPannel from './CodeDiffPannel';
import MD5 from './MD5';
import { useState } from 'react';

enum Tab {
  CodeDiff = 'code-diff',
  MD5 = 'md5',
}

interface SSRBProps {}

const SSRB: React.FC<SSRBProps> = (props) => {
  const [tab, setTab] = useState(Tab.CodeDiff);

  return (
    <>
      <Segmented
        value={tab}
        onChange={setTab as any}
        options={[
          { label: 'Code diff', value: Tab.CodeDiff, icon: <CodeOutlined /> },
          { label: 'Md5', value: Tab.MD5, icon: <BarsOutlined /> },
        ]}
      />

      <div className='mt-24'>
        <div className={tab !== Tab.CodeDiff ? 'hidden' : ''}>
          <CodeDiffPannel />
        </div>

        <div className={tab !== Tab.MD5 ? 'hidden' : ''}>
          <MD5 />
        </div>
      </div>
    </>
  );
};

export default SSRB;
