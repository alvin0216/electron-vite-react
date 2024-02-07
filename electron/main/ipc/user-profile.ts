import fse from 'fs-extra';
import { IPCEnum } from '@constants/enum';
import { ipcMain, shell } from 'electron';
import { dialog } from 'electron';
import { homedir } from 'os';
import { resolve } from 'path';

const desktopPath = resolve(homedir(), 'Desktop');
const userProfilePath = resolve(desktopPath, 'vantage-dev-tools-user-profile.json');

console.log(123, desktopPath, userProfilePath);

export function ipcUserProfile() {
  ipcMain.handle(IPCEnum.ExportUserProfile, (args, json) => {
    fse.writeJSONSync(userProfilePath, json);

    shell.showItemInFolder(userProfilePath);
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

async function selectUserJson() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'vantage-dev-tools-user-profile.json', extensions: ['json'] }],
    properties: ['openFile'],
    defaultPath: desktopPath,
    buttonLabel: 'Select file',
  });
  return canceled ? undefined : filePaths[0];
}
