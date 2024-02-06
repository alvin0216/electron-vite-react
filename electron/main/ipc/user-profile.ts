import fse from 'fs-extra';
import { IPCEnum } from '@constants/enum';
import { ipcMain } from 'electron';
import { selectUserJson } from '../utils';

export function ipcUserProfile() {
  ipcMain.handle(IPCEnum.ExportUserProfile, (args, json) => {
    // ...
    const filePath = 'vantage-dev-tools-user-profile.json';
    fse.writeJSONSync(filePath, json);
    return true;
  });

  ipcMain.handle(IPCEnum.ImportUserProfile, async () => {
    const filePath = await selectUserJson();
    if (filePath) {
      return fse.readJSONSync(filePath);
    }
    return false;
  });
}
