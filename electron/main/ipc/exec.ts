import { IPCEnum, SerivceBinAction } from '@constants/enum';
import { ipcMain } from 'electron';

import shelljs from 'shelljs';
shelljs.config.execPath = String(shelljs.which('node'));

export function ipcExec() {
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
