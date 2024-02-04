import { useFile } from '@/hooks/useFile';
import { useIpc } from '@/hooks/useIpc';
import { useStore } from '@/hooks/useStore';
import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';
import { useRequest } from 'ahooks';
import { Badge, Button, Space } from 'antd';
import { produce } from 'immer';
import { useMemo } from 'react';

interface OperateFileProps {}

const OperateFile: React.FC<OperateFileProps> = () => {
  const [store, setStore] = useStore();
  const { invoke } = useIpc();
  const { isReadonly, isWriteable, notFound } = useFile(FileKeyEnum.Hypothesis);

  const { badgeStatus, text, actionText } = useMemo(() => {
    if (isWriteable) return { badgeStatus: 'processing', text: 'File is writable', actionText: 'set readonly' };
    else if (isReadonly) return { badgeStatus: 'warning', text: 'File is readonly', actionText: 'set writable' };
    else if (isReadonly) return { badgeStatus: 'error', text: 'File not found' };
    return {};
  }, [isReadonly, notFound, notFound]);

  const { run, loading } = useRequest(
    () => {
      const newStatus = isReadonly ? FileStatus.Writeable : FileStatus.Readonly;
      return invoke(IPCEnum.SetFileStatus, {
        fileKey: FileKeyEnum.Hypothesis,
        status: newStatus,
      })
        .then((res) => {
          setStore(
            produce(store, (s) => {
              s.hypothesis.status = newStatus;
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    {
      manual: true,
    }
  );

  return (
    <div className='flex items-baseline'>
      <Badge status={badgeStatus as any} text={text} />
      {actionText && (
        <Button type='link' className='pl-8' loading={loading} onClick={run}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default OperateFile;
