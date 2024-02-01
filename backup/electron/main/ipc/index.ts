import { BrowserWindow, ipcMain, shell, app } from "electron";

import ipcTranslation from "./ipc-translation";
import ipcEnvTools from "./ipc-env-tools";
import ipcSmbInfo from "./ipc-smbInfo";

import { selectFolder } from "../utils";

import ipcReleaseHelper from "./ipc-release-helper";
import ipcShell from "./ipc-shell";
import { EMCEnum, PathEnum } from "../../../universal/enum";
import ipcHypothesis from "./ipc-hypothesis";
import ipcReg from "./ipc-reg";
import ipcUserSetting from "./ipc-user-setting";

export function ipc(win: BrowserWindow) {
  global.win = win;

  ipcReg();
  ipcMain.on(EMCEnum.OPEN_URL, (args, url) => shell.openExternal(url));
  ipcMain.on(EMCEnum.OPEN_FILE, (args, filePath) => shell.openPath(filePath));
  ipcMain.on(EMCEnum.OPEN_FOLDER, (args, folderPath) =>
    shell.showItemInFolder(folderPath)
  );

  ipcMain.on(EMCEnum.OPEN_LOGS_FOLDER, () => {
    const LOCALAPPDATA = process.env.LOCALAPPDATA;
    shell.openPath(
      PathEnum.vantageLogsPath.replace("%localappdata%", LOCALAPPDATA)
    );
  });

  ipcMain.on(EMCEnum.OPEN_METRICS_FOLDER, () => {
    const ProgramData = process.env.ProgramData;
    shell.openPath(
      PathEnum.vantageMetricsPath.replace("%ProgramData%", ProgramData)
    );
  });

  ipcMain.on(EMCEnum.OPEN_DEV_TOOLS, () => win.webContents.openDevTools());
  // common
  ipcMain.handle(EMCEnum.SELECT_FOLDER, selectFolder);

  ipcEnvTools(win);
  ipcSmbInfo(win);
  ipcHypothesis(win);
  ipcUserSetting(win);
  ipcTranslation();
  ipcReleaseHelper();
  ipcShell();
}
