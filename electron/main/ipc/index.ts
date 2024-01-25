import { BrowserWindow } from 'electron';
import { fileOperation } from './file-operation';

export function ipcHandler(win: BrowserWindow) {
  fileOperation(win);
}
