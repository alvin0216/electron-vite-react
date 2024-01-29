import { BrowserWindow } from 'electron';
import { fileOperation } from './file-operation';
import { demo } from './demo';

export function ipcHandler(win: BrowserWindow) {
  fileOperation(win);

  demo(win);
}
