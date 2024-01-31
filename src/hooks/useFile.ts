import { FileKeyEnum, IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';
import { useStore } from './useStore';

export function useFile(fileKey: FileKeyEnum) {
  const [state, setState] = useStore();
  const { send } = useIpc();

  const setJson = (newJson: object) => {
    // send(IPCEnum.UpdateFile, { key: fileKey, json: newJson });
    setState({ smbInfo: newJson });
  };

  return { json: state[fileKey], setJson, open: () => send(IPCEnum.OpenFile) };
}
