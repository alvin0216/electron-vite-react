import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';
import { useStore } from './useStore';
import { isDevOnWeb } from '@/env';
import { produce } from 'immer';

export function useFile(fileKey: FileKeyEnum) {
  const [state, setState] = useStore();
  const { send } = useIpc();

  const setJson = (newJson: object) => {
    if (isDevOnWeb) {
      setState(
        produce(state, (draft) => {
          draft[fileKey].status = FileStatus.Writeable;
          draft[fileKey].value = newJson;
        })
      );
    }

    window.ipcRenderer?.emit(IPCEnum.UpdateFile, { key: fileKey, json: newJson });
  };

  const fileInfo = state[fileKey] as FileItem;

  return {
    status: fileInfo.status,
    json: fileInfo.value as any,
    setJson,
    open: () => send(IPCEnum.OpenFile, fileKey),
  };
}
