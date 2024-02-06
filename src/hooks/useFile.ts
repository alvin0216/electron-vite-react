import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';
import { useStore } from './useStore';
import { isDevOnWeb } from '@/env';
import { produce } from 'immer';

export function useFile(fileKey: FileKeyEnum) {
  const [state, setState] = useStore();
  const { send, invoke } = useIpc();
  const fileInfo = state[fileKey] as FileItem;
  const status = fileInfo.status;

  const [isReadonly, isWriteable, notFound] = [
    status === FileStatus.Readonly,
    status === FileStatus.Writeable,
    status === FileStatus.NotFound,
  ];

  const setJson = (newJson: object, status: FileStatus = FileStatus.Writeable) => {
    if (isDevOnWeb) {
      setState(
        produce(state, (draft) => {
          draft[fileKey].status = status;
          draft[fileKey].value = newJson;
          if (fileKey === FileKeyEnum.SMBInfo || fileKey === FileKeyEnum.Hypothesis) draft.service.bootingDot = true;
        })
      );
    } else {
      if ([FileKeyEnum.Hypothesis, FileKeyEnum.SMBInfo].includes(fileKey)) {
        setState(
          produce(state, (draft) => {
            draft.service.bootingDot = true;
          })
        );
      }

      send(IPCEnum.UpdateFile, { key: fileKey, json: newJson });
    }
  };

  return {
    status,
    isReadonly,
    isWriteable,
    notFound,
    json: fileInfo.value as any,
    setJson,
    open: () => send(IPCEnum.OpenFile, fileKey),
  };
}
