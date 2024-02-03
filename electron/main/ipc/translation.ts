import { BrowserWindow } from 'electron';
import { FileKeyEnum, FileStatus, IPCEnum } from '@constants/enum';
import { useBridge } from '../utils/bridge';

export function ipcWatchFiles(win: BrowserWindow) {
  const bridge = useBridge(win);

  bridge.handle(IPCEnum.Translate, (args, payload: IPCPayload.Tran) => {
    // ...
    // ...
  });
}
