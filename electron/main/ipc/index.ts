import { IPCEnum } from '@constants/enum';
import { BrowserWindow, ipcMain } from 'electron';
import { ipcWatchFiles } from './file-watch';
import { ipcTranslation } from './translation';
import { ipcRegistry } from './registry';
import { ipcExec } from './exec';

export function ipcHandler(win: BrowserWindow) {
  ipcWatchFiles(win);
  ipcTranslation(win);
  ipcRegistry(win);
  ipcExec();

  ipcMain.on(IPCEnum.OpenDevTools, () => win.webContents.openDevTools());
}
