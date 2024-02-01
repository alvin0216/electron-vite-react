import { app } from "electron";

const LOCALAPPDATA = process.env.LOCALAPPDATA;

export const getFilePath = (key: APIKey) => {
  switch (key) {
    case "userSetting":
      return `${app.getPath("userData")}\\userSetting.json`;

    case "betaConfigJson":
      return `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanionBeta_k1h2ywk1493x8\\LocalState\\config.json`;

    case "nonBetaConfigJson":
      return `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\config.json`;

    default:
      const map = {
        SMBInfo: "C:\\ProgramData\\Lenovo\\Vantage\\SMBInfo.json",
      };

      return map[key];
  }
};
