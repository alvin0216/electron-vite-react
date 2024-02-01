import { BrowserWindow, ipcMain, shell } from "electron";

import { readOrCreateJson, updateJsonFile } from "../utils";
import { getFilePath } from "../getFilePath";

const fs = require("fs-extra");

export default function ipcUserSetting(win: BrowserWindow) {
  let watcherMap = {};

  ipcMain.handle("readJson", (args, key: APIKey) => {
    const filePath = getFilePath(key);
    const json = readOrCreateJson(filePath);
    watcherMap[key]?.close?.();
    // 关闭监视器
    watcherMap[key] = fs.watch(filePath, () => {
      const defaultJson = key !== "userSetting" ? {} : {};
      const json = readOrCreateJson(filePath, true, defaultJson);
      win.webContents.send("onJsonChange", { key, json });
    });

    return json;
  });

  ipcMain.on("showItemInFolder", (args, key: APIKey) => {
    shell.showItemInFolder(getFilePath(key));
  });

  ipcMain.on("updateJson", (args, payload: { key: APIKey; json: object }) => {
    const { key, json } = payload;
    return updateJsonFile(getFilePath(key), json);
  });
}
