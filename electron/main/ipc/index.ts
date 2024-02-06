import { IPCEnum, OpenTypeEnum } from '@constants/enum';
import { BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { ipcWatchFiles } from './file-watch';
import { ipcTranslation } from './translation';
import { ipcRegistry } from './registry';
import { ipcExec } from './exec';
import { ipcSSRB } from './ssrb';

export function ipcHandler(win: BrowserWindow) {
  ipcWatchFiles(win);
  ipcRegistry(win);
  ipcExec();
  ipcSSRB();
  ipcTranslation(win);

  ipcMain
    .on(IPCEnum.OpenDevTools, () => win.webContents.openDevTools())
    .on(IPCEnum.Open, (arg, { type, link }) => {
      switch (type) {
        case OpenTypeEnum.File:
          shell.openPath(link);
          break;

        case OpenTypeEnum.Folder:
          shell.openPath(link);
          break;

        case OpenTypeEnum.Url:
          shell.openExternal(link);
          break;
        default:
          break;
      }
    });
}
