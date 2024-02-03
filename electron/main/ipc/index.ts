import { BrowserWindow } from 'electron';
import { ipcWatchFiles } from './file-watch';

export function ipcHandler(win: BrowserWindow) {
  ipcWatchFiles(win);
}
