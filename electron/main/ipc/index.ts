import { IPCEnum } from '@constants/enum';
import { BrowserWindow, dialog, ipcMain } from 'electron';
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
