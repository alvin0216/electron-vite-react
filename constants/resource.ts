import { FileKeyEnum } from './enum';

const LOCALAPPDATA = process.env.LOCALAPPDATA;
const ProgramData = process.env.ProgramData;

export const resourceMap = {
  smbInfo: 'C:\\ProgramData\\Lenovo\\Vantage\\SMBInfo.json',
  hypothesis: 'C:\\ProgramData\\Lenovo\\Vantage\\SystemData\\Hypothesis\\hypothesis.config',
  configJson: `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\config.json`,
  // configJson: '/Users/guoshaowei/Desktop/code/electron-vite-react/dev/config.json',
  betaConfigJson: `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanionBeta_k1h2ywk1493x8\\LocalState\\config.json`,
  vantageLogsPath: `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\Logs\\LenovoVantage`,
  vantageMetricsPath: `${ProgramData}\\Lenovo\\Vantage\\AddinData\\GenericTelemetryAddin`,

  // other links
  releaseHelperUrl: 'https://confluence.tc.lenovo.com/display/CT/Build%2C+Deploy%2C+SSRB+and+Release',
};

// export const fileWatchMap = new Map([
//   [
//     FileKeyEnum.ConfigJson,
//     `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\config.json`,
//   ],
//   [
//     FileKeyEnum.BetaConfigJson,
//     `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanionBeta_k1h2ywk1493x8\\LocalState\\config.json`,
//   ],
//   [FileKeyEnum.SMBInfo, 'C:\\ProgramData\\Lenovo\\Vantage\\SMBInfo.json'],
//   [FileKeyEnum.Hypothesis, 'C:\\ProgramData\\Lenovo\\Vantage\\SystemData\\Hypothesis\\hypothesis.config'],
// ]);

export const fileWatchMap = new Map([
  [FileKeyEnum.ConfigJson, '/Users/guoshaowei/Desktop/code/electron-vite-react/dev/config.json'],
  [FileKeyEnum.BetaConfigJson, '/Users/guoshaowei/Desktop/code/electron-vite-react/dev/config.json'],
  [FileKeyEnum.SMBInfo, '/Users/guoshaowei/Desktop/code/electron-vite-react/dev/SMBInfo.json'],
  [FileKeyEnum.Hypothesis, '/Users/guoshaowei/Desktop/code/electron-vite-react/dev/hypothesis.config'],
]);
