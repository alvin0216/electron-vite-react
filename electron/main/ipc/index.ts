import { BrowserWindow } from 'electron';
import { ipcWatchFiles } from './file-watch';
import { ipcTranslation } from './translation';

export function ipcHandler(win: BrowserWindow) {
  ipcWatchFiles(win);
  ipcTranslation(win);
}
