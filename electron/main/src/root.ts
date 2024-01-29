import { BrowserWindow } from 'electron';
import { fileHandler } from './ipcs/fileHandler';

export function ipcHandler(win: BrowserWindow) {
  fileHandler(win);
}
