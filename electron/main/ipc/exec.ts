import { IPCEnum, SerivceBinAction } from '@constants/enum';
import { ipcMain } from 'electron';
import { generateSha256 } from '../utils';

import shelljs from 'shelljs';
shelljs.config.execPath = String(shelljs.which('node'));

export function ipcExec() {
  ipcMain.handle(IPCEnum.GetMD5, (arg, path) => generateSha256(path));

  ipcMain.handle(IPCEnum.ServiceBin, (arg, action: SerivceBinAction) => {
    const stop = 'net stop LenovoVantageService';
    const start = 'net start LenovoVantageService';
    const map = {
      start,
      stop,
      reboot: `${stop} && ${start}`,
    };
    return shelljs.exec(map[action]);
  });
}
