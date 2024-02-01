import { ipcMain } from "electron";
import { EMCEnum } from "../../../universal/enum";
import { cmd } from "../utils";

const gamingRegPath =
  "HKLM\\SOFTWARE\\WOW6432Node\\Lenovo\\ImController\\Applicability\\Tags";
const gamingRegKeyName = "System.Profile.Gaming";

const countryRegPath = "HKCU\\Control Panel\\International\\Geo";

export default function ipcReg() {
  ipcMain.handle(EMCEnum.READ_REG, async (arg, params) => {
    const str1 = await cmd(
      `reg query ${gamingRegPath} /v ${gamingRegKeyName} 2>nul | findstr ${gamingRegKeyName}`
    );
    const str2 = await cmd(
      `reg query "${countryRegPath}" /v Name 2>nul | findstr Name`
    );
    return {
      computerType: str1.match(/(\w+)\r\n/)?.[1] ? "gaming" : "no-gaming",
      country: str2.match(/(\w+)\r\n/)?.[1],
    };
  });

  ipcMain.handle(EMCEnum.UPDATE_REG, (arg, params: UpdateRegParams) => {
    const { key, computerType, countryCode } = params;

    switch (key) {
      case "computerType":
        if (computerType === "gaming")
          return cmd(
            `reg add ${gamingRegPath} /v ${gamingRegKeyName} /t REG_SZ /d true /f`
          );

        return cmd(`reg delete ${gamingRegPath} /v ${gamingRegKeyName} /f`);

      case "country":
        return cmd(
          `reg add "${countryRegPath}" /v Name /t REG_SZ /d ${countryCode} /f`
        );
    }
  });
}
