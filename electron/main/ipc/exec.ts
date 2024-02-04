import { IPCEnum } from '@constants/enum';
import { ipcMain } from 'electron';
import { generateSha256 } from '../utils';

export function ipcExec() {
  ipcMain.handle(IPCEnum.GetMD5, (arg, path) => generateSha256(path));
}
