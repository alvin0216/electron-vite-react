export enum IPCEnum {
  ReadFile = 'ReadFile',
  UpdateFile = 'UpdateFile',
  OpenFile = 'OpenFile',
  OnFileChange = 'OnFileChange',

  // invoke
  ChangeServiceStatus = 'ChangeServiceStatus',
  Errorlog = 'Errorlog',
}

// ....
export enum FileKeyEnum {
  ConfigJson = 'configJson',
  BetaConfigJson = 'betaConfigJson',
  SMBInfo = 'smbInfo',
  Hypothesis = 'hypothesis',
}

export enum FileStatus {
  Writeable = 'writeable',
  Readonly = 'readonly',
  NotFound = 'not found',
}

export enum AppTypeEnum {
  Beta = 'beta',
  NonBeta = 'non-beta',
}
