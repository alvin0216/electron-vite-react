import { FileKeyEnum, IPCEnum } from '@enum/index';
import { useIpc } from './useIpc';
import { useStore } from './useStore';

export function useFile(fileKey: FileKeyEnum) {
  const [state] = useStore();
  const { send } = useIpc();

  const setJson = (newJson: object) => {
    send(IPCEnum.UpdateFile, { key: fileKey, json: newJson });
  };

  return { json: state[fileKey], setJson, open: () => send(IPCEnum.OpenFile) };
}
