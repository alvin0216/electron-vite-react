import { BrowserWindow, ipcMain } from "electron";
import { EMCEnum, PathEnum } from "../../../universal/enum";
const fs = require("fs-extra");

const filePath = PathEnum.hypothesisFilePath;

export default function ipcHypothesis(win: BrowserWindow) {
  let watcher: any;

  ipcMain.handle(EMCEnum.READ_HYPOTHESIS, () => {
    const data = readHypothesis(filePath);

    if (data.isFileExist) {
      // 关闭监视器
      watcher?.close?.();
      watcher = fs.watch(filePath, (eventType, filename) => {
        win.webContents.send(
          EMCEnum.ON_HYPOTHESIS_CHANGE,
          readHypothesis(filePath)
        );
      });
    }

    return data;
  });

  ipcMain.handle(EMCEnum.UPDATE_HYPOTHESIS, (arg, json) => {
    fs.writeJSONSync(filePath, json, { spaces: 2 });
  });

  ipcMain.handle(EMCEnum.SET_HYPOTHESIS_STATUS, (arg, { isFileWritable }) => {
    if (isFileWritable) fs.chmodSync(filePath, "666");
    else fs.chmodSync(filePath, "444");
  });
}

function readHypothesis(path = PathEnum.smbFilePath) {
  const isFileExist = fs.existsSync(path);
  if (!isFileExist) return { isFileExist };
  let content = fs.readFileSync(path, "utf8");
  return {
    isFileExist,
    hypothesis: JSON.parse(content),
    isFileWritable: isFileWritable(path),
  };
}

function isFileWritable(filePath: string) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}
