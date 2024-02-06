import Copy from '@/components/Copy';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const DiffResult: React.FC = (props) => {
  const { diffLine, diffSize, filename } = useCodediffCtx();
  return (
    <ProDescriptions
      dataSource={diffLine > 0 ? { diffLine, diffSize } : undefined}
      column={1}
      columns={[
        {
          title: 'DiffLine',
          dataIndex: 'diffLine',
        },
        {
          title: 'DiffSize',
          dataIndex: 'diffSize',
        },
        {
          title: 'File',
          dataIndex: 'filename',
          render: () => (
            <Space className='relative translate-y--4'>
              <Button className='p-0' type='link'>
                {filename}
              </Button>
              <Copy text={filename} />
            </Space>
          ),
        },
      ]}
    />
  );
};

export default DiffResult;
