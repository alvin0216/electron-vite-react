import { BrowserWindow, ipcMain } from 'electron';
import { ipcWatchFiles } from './file-watch';
import { ipcTranslation } from './translation';
import { IPCEnum } from '@constants/enum';
import { ipcRegistry } from './registry';

export function ipcHandler(win: BrowserWindow) {
  ipcWatchFiles(win);
  ipcTranslation(win);
  ipcRegistry(win);

  ipcMain.on(IPCEnum.OpenDevTools, () => win.webContents.openDevTools());
}
