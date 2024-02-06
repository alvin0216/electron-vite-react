import Copy from '@/components/Copy';
import { useCodediffCtx } from '@/hooks/useCodediffCtx';
import { useIpc } from '@/hooks/useIpc';
import { ProDescriptions } from '@ant-design/pro-components';
import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { Button, Space, Typography } from 'antd';

const DiffResult: React.FC = (props) => {
  const { send } = useIpc();

  const { diffLine, diffSize, packagediffText, filename, cdFields } = useCodediffCtx();

  const hasResult = diffLine > 0;

  const open = () => send(IPCEnum.Open, { type: OpenTypeEnum.File, link: cdFields.repoPath + '\\' + filename });

  const dataSource = hasResult ? { diffLine, diffSize, packagediffText } : undefined;
  return (
    <ProDescriptions
      dataSource={dataSource}
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
              <Space className='relative translate-y--6'>
                <Button className='p-0' type='link' onClick={open}>
                  {filename}
                </Button>
                <Copy text={filename} tooltips='copy file name' />
              </Space>
            ),
        },
        {
          title: 'package.json diff',
          dataIndex: 'packagediffText',
          valueType: 'jsonCode',
        },
      ]}
    />
  );
};

export default DiffResult;
