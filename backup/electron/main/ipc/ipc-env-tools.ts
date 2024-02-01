import { BrowserWindow, dialog, ipcMain, shell } from "electron";

import { readOrCreateJson, updateJsonFile } from "../utils";
import { EMCEnum, PathEnum, VantageAppTypeEnum } from "../../../universal/enum";
const fs = require("fs-extra");

const isMac = process.platform === "darwin";
const LOCALAPPDATA = process.env.LOCALAPPDATA || "test";

export default function ipcEnvTools(win: BrowserWindow) {
  let watcher: any;
  ipcMain.handle(EMCEnum.READ_ENV_CONFIG_FILE, (args, { appType }) => {
    const filePath = getConfigPath(appType);
    const json = readOrCreateJson(filePath);

    // 关闭监视器
    watcher?.close?.();
    watcher = fs.watch(filePath, (eventType, filename) => {
      const json = readOrCreateJson(filePath);
      win.webContents.send(EMCEnum.ON_ENV_CONFIG_FILE_CHANGE, json);
    });

    return json;
  });

  ipcMain.on(EMCEnum.OPEN_ENV_CONFIG_FILE, (args, appType) => {
    shell.showItemInFolder(getConfigPath(appType));
  });

  ipcMain.handle(EMCEnum.UPDATE_ENV_CONFIG_FILE, (args, { appType, json }) => {
    return updateJsonFile(getConfigPath(appType), json);
  });
}

function getConfigPath(appType: VantageAppTypeEnum.beta) {
  if (isMac)
    return `/Users/guoshaowei/Desktop/code/vantage-dev-tools/test/${appType}.json`;

  return appType === "beta"
    ? PathEnum.vantageBetaEnvConfigFilePath.replace(
        "%localappdata%",
        LOCALAPPDATA
      )
    : PathEnum.vantageEnvConfigFilePath.replace("%localappdata%", LOCALAPPDATA);
}
