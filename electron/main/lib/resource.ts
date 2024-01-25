const LOCALAPPDATA = process.env.LOCALAPPDATA;
const ProgramData = process.env.ProgramData;
export const resourceMap = {
  smbInfo: 'C:\\ProgramData\\Lenovo\\Vantage\\SMBInfo.json',
  hypothesis: 'C:\\ProgramData\\Lenovo\\Vantage\\SystemData\\Hypothesis\\hypothesis.config',
  vantageEnvConfig: `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\config.json`,
  vantageBetaEnvConfig: `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanionBeta_k1h2ywk1493x8\\LocalState\\config.json`,
  vantageLogsPath: `${LOCALAPPDATA}\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\Logs\\LenovoVantage`,
  vantageMetricsPath: `${ProgramData}\\Lenovo\\Vantage\\AddinData\\GenericTelemetryAddin`,
  test: '/Users/guoshaowei/Desktop/code/electron-vite-react/test.json',

  // other links
  releaseHelperUrl: 'https://confluence.tc.lenovo.com/display/CT/Build%2C+Deploy%2C+SSRB+and+Release',
};

export type ResourceKey = keyof typeof resourceMap;
