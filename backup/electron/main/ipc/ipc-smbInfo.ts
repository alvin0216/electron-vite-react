import { BrowserWindow, ipcMain, shell, app } from "electron";

import { readOrCreateJson, updateJsonFile } from "../utils";
import { EMCEnum, PathEnum } from "../../../universal/enum";

const fs = require("fs-extra");

let smbInfoPath =
  process.platform === "win32" ? PathEnum.smbFilePath : "test/SMBInfo.json";

export default function ipcSmbInfo(win: BrowserWindow) {
  let watcher: any;
  ipcMain.handle(EMCEnum.READ_SMB_FILE, () => {
    const isFileExist = fs.existsSync(PathEnum.smbFilePath);
    if (!isFileExist) return {};

    watcher?.close?.();
    watcher = fs.watch(PathEnum.smbFilePath, (eventType, filename) => {
      win.webContents.send(
        EMCEnum.ON_SMB_FILE_CHANGE,
        readOrCreateJson(PathEnum.smbFilePath)
      );
    });

    return readOrCreateJson(PathEnum.smbFilePath);
  });

  ipcMain.handle(EMCEnum.UPDATE_SMB_FILE, (args, params) =>
    updateJsonFile(smbInfoPath, params)
  );
  ipcMain.on(EMCEnum.OPEN_SMB_FILE, () => shell.openPath(smbInfoPath));

  ipcMain.handle(EMCEnum.READ_CHAHE_FILE, (args, params) => {
    const filePath = getAppCachePath();
    const json = readOrCreateJson(filePath);

    watcher?.close?.();
    watcher = fs.watch(filePath, (eventType, filename) => {
      win.webContents.send(
        EMCEnum.ON_CACHE_FILE_CHANGE,
        readOrCreateJson(filePath)
      );
    });
    return json;
  });

  ipcMain.handle(EMCEnum.UPDATE_CHAHE_FILE, (args, json) => {
    const filePath = getAppCachePath();
    updateJsonFile(filePath, json);
  });

  ipcMain.on(EMCEnum.OPEN_CACHE_FILE, () => shell.openPath(getAppCachePath()));
}

function getAppCachePath() {
  const userDataPath = app.getPath("userData");
  return `${userDataPath}/cache.json`;
}
