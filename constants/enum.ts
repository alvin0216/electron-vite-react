export enum IPCEnum {
  ReadFile = 'ReadFile',
  UpdateFile = 'UpdateFile',
  OpenFile = 'OpenFile',
  OnFileChange = 'OnFileChange',
  OpenDevTools = 'OpenDevTools',
  GetMD5 = 'GetMD5',

  // invoke
  ChangeServiceStatus = 'ChangeServiceStatus',
  Errorlog = 'Errorlog',
  Translate = 'Translate',
  ToggleFileStatus = 'ToggleFileStatus', // Set Hypothesis status - writable readonly
  ReadPCSetting = 'ReadPCSetting',
  SetGaming = 'SetGaming',
  SetCountry = 'SetCountry',
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

export enum PCTypeEnum {
  Gaming = 'gaming',
  NotGaming = 'notGaming',
}

export enum DisplayEnum {
  En = 'en',
  Zh = 'cn',
}
