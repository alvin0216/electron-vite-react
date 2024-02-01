import { ipcMain } from "electron";
import { cmd } from "../utils";
import { EMCEnum } from "../../../universal/enum";

const sudo = require("sudo-prompt");

export default function ipcShell() {
  ipcMain.handle(EMCEnum.RESTART_VANTAGE_SERVICE, (arg, params) => {
    const cmdStr =
      "net stop LenovoVantageService && net start LenovoVantageService";
    return params?.sudo ? sudoExec(cmdStr) : cmd(cmdStr);
  });

  ipcMain.handle(EMCEnum.STOP_VANTAGE_SERVICE, (arg, params) => {
    const cmdStr = "net stop LenovoVantageService";
    return params?.sudo ? sudoExec(cmdStr) : cmd(cmdStr);
  });

  ipcMain.handle(EMCEnum.START_VANTAGE_SERVICE, (arg, params) => {
    const cmdStr = "net start LenovoVantageService";
    return params?.sudo ? sudoExec(cmdStr) : cmd(cmdStr);
  });
}

function sudoExec(cmdStr) {
  console.log("🚀 run cmd: ", cmdStr);
  return new Promise((resolve, reject) => {
    sudo.exec(
      cmdStr,
      { name: "Vantage Dev Tools" },
      function (error, stdout, stderr) {
        console.log({ stdout, stderr });
        if (error) reject(error);
        resolve(1);
      }
    );
  });
}
