/** ElectronMethodCommunication */
export enum EMCEnum {
  ON_LOG = "ON_LOG",

  // common
  OPEN_URL = "OPEN_URL",
  OPEN_FILE = "OPEN_FILE",
  OPEN_FOLDER = "OPEN_FOLDER",
  SELECT_FOLDER = "SELECT_FOLDER",
  RESTART_VANTAGE_SERVICE = "RESTART_VANTAGE_SERVICE",
  START_VANTAGE_SERVICE = "START_VANTAGE_SERVICE",
  STOP_VANTAGE_SERVICE = "STOP_VANTAGE_SERVICE",

  OPEN_LOGS_FOLDER = "OPEN_LOGS_FOLDER",
  OPEN_METRICS_FOLDER = "OPEN_METRICS_FOLDER",
  OPEN_DEV_TOOLS = "OPEN_DEV_TOOLS",
  // envTools
  READ_ENV_CONFIG_FILE = "READ_ENV_CONFIG_FILE",
  UPDATE_ENV_CONFIG_FILE = "UPDATE_ENV_CONFIG_FILE",
  OPEN_ENV_CONFIG_FILE = "OPEN_ENV_CONFIG_FILE",
  ON_ENV_CONFIG_FILE_CHANGE = "ON_ENV_CONFIG_FILE_CHANGE", // list on config file changes

  // release helper
  GET_PROJECT_INFO = "GET_PROJECT_INFO",
  GENERATE_CODE_DIFF = "GENERATE_CODE_DIFF",
  CHECK_DEPENDENCIES = "CHECK_DEPENDENCIES",
  GENERATE_AUDIT_REPORT = "GENERATE_AUDIT_REPORT",

  // smb file
  READ_SMB_FILE = "READ_SMB_FILE",
  UPDATE_SMB_FILE = "UPDATE_SMB_FILE",
  OPEN_SMB_FILE = "OPEN_SMB_FILE",
  ON_SMB_FILE_CHANGE = "ON_SMB_FILE_CHANGE",

  // tanslation
  TRANSLATION_IMPORT = "TRANSLATION_IMPORT",

  // hypothesis
  READ_HYPOTHESIS = "READ_HYPOTHESIS",
  UPDATE_HYPOTHESIS = "UPDATE_HYPOTHESIS",
  ON_HYPOTHESIS_CHANGE = "ON_HYPOTHESIS_CHANGE",
  SET_HYPOTHESIS_STATUS = "SET_HYPOTHESIS_STATUS",

  READ_REG = "READ_REG",
  UPDATE_REG = "UPDATE_REG",

  READ_CHAHE_FILE = "READ_CHAHE_FILE",
  UPDATE_CHAHE_FILE = "UPDATE_CHAHE_FILE",
  ON_CACHE_FILE_CHANGE = "ON_CACHE_FILE_CHANGE",
  OPEN_CACHE_FILE = "OPEN_CACHE_FILE",
}

export enum PathEnum {
  smbFilePath = "C:\\ProgramData\\Lenovo\\Vantage\\SMBInfo.json",
  // smbFilePath = "/Users/guoshaowei/Desktop/code/vantage-dev-tools2/test/SMBInfo.json",
  releaseHelperUrl = "https://confluence.tc.lenovo.com/display/CT/Build%2C+Deploy%2C+SSRB+and+Release",
  devToolsOfficialUrl = "https://confluence.tc.lenovo.com/x/RJHgJ",
  devToolsDownloadUrl = "\\\\10.176.36.49\\vantage\\test\\Alvin\\vantage-dev-tools-release",
  devToolsDownloadUrl2 = "https://lenovobeijing-my.sharepoint.com/personal/guosw5_lenovo_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fguosw5%5Flenovo%5Fcom%2FDocuments%2FVantage%20Dev%20Tools%20%2D%20Release&ga=1",
  hypothesisFilePath = "C:\\ProgramData\\Lenovo\\Vantage\\SystemData\\Hypothesis\\hypothesis.config",
  // hypothesisFilePath = "/Users/guoshaowei/Desktop/code/vantage-dev-tools2/test/hypothesis.config",
  vantageEnvConfigFilePath = "%localappdata%\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\config.json",
  vantageBetaEnvConfigFilePath = "%localappdata%\\Packages\\E046963F.LenovoCompanionBeta_k1h2ywk1493x8\\LocalState\\config.json",
  vantageLogsPath = "%localappdata%\\Packages\\E046963F.LenovoCompanion_k1h2ywk1493x8\\LocalState\\Logs\\LenovoVantage",
  vantageShellPath = "\\\\10.176.36.49\\vantage\\test\\Build\\Vantage3.0\\Consumer Build",
  vantageMetricsPath = "%ProgramData%\\Lenovo\\Vantage\\AddinData\\GenericTelemetryAddin",
  vantageTestBenchUrl = "http://10.176.33.41/enm/vantage30/TestBench/",
}

export enum VantageAppTypeEnum {
  beta = "beta",
  nonBeta = "non-beta",
}
