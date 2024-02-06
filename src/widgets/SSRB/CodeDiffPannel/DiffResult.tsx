import Copy from '@/components/Copy';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';

const DiffResult: React.FC = (props) => {
  const { diffLine, diffSize, filename } = useCodediffCtx();

  const hasResult = diffLine > 0;

  return (
    <ProDescriptions
      dataSource={hasResult ? { diffLine, diffSize } : undefined}
      column={1}
      columns={[
        {
          title: 'diff line',
          dataIndex: 'diffLine',
        },
        {
          title: 'diff size',
          dataIndex: 'diffSize',
        },
        {
          title: 'file',
          dataIndex: 'filename',
          render: () =>
            !hasResult ? (
              '-'
            ) : (
              <Space className='relative translate-y--4'>
                <Button className='p-0' type='link'>
                  {filename}
                </Button>
                <Copy text={filename} />
              </Space>
            ),
        },
        {
          title: 'package.json diff',
          dataIndex: 'Package',
          valueType: 'jsonCode',
        },
      ]}
    />
  );
};

export default DiffResult;
