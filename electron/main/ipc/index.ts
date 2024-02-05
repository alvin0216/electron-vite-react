import { IPCEnum } from '@constants/enum';
import { BrowserWindow, dialog, ipcMain } from 'electron';
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

  ipcMain.on(IPCEnum.OpenDevTools, () => win.webContents.openDevTools());

  ipcMain.handle(IPCEnum.OpenDirectory, async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (canceled) {
      return;
    } else {
      return filePaths[0];
    }
  });
}
