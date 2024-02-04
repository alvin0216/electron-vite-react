export enum IPCEnum {
  ReadFile = 'ReadFile',
  UpdateFile = 'UpdateFile',
  OpenFile = 'OpenFile',
  OnFileChange = 'OnFileChange',
  // Set Hypothesis status - writable readonly
  ToggleFileStatus = 'ToggleFileStatus',

  // invoke
  ChangeServiceStatus = 'ChangeServiceStatus',
  Errorlog = 'Errorlog',
  Translate = 'Translate',
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

export enum IndentationEnum {
  Two = 2,
  Four = 4,
}
