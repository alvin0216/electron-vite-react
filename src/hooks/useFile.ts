import { FileKeyEnum, IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';
import { useStore } from './useStore';

export function useFile(fileKey: FileKeyEnum) {
  const [state] = useStore();
  const { send } = useIpc();

  const setJson = (newJson: object) => {
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
