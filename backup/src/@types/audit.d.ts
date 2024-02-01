interface AuditReportJson {
  auditReportVersion: number;
  vulnerabilities: Vulnerabilities;
  metadata: Metadata;
}

interface Metadata {
  vulnerabilities: Vulnerabilities2;
  dependencies: Dependencies;
}

interface Dependencies {
  prod: number;
  dev: number;
  optional: number;
  peer: number;
  peerOptional: number;
  total: number;
}

interface Vulnerabilities2 {
  info: number;
  low: number;
  moderate: number;
  high: number;
  critical: number;
  total: number;
}

interface Vulnerabilities {
  chokidar: Chokidar;
  "glob-parent": Globparent;
  happypack: Happypack;
  ini: Ini;
  "jest-environment-jsdom-fourteen": Jestenvironmentjsdomfourteen;
  jsdom: Jsdom;
  json5: Globparent;
  "loader-utils": Loaderutils;
  minimatch: Ini;
  minimist: Minimist;
  mkdirp: Jestenvironmentjsdomfourteen;
  "node-forge": Globparent;
  request: Minimist;
  "request-promise-core": Requestpromisecore;
  "request-promise-native": Requestpromisecore;
  selfsigned: Chokidar;
  tar: Ini;
  watchpack: Jestenvironmentjsdomfourteen;
  "watchpack-chokidar2": Requestpromisecore;
  "webpack-dev-server": Happypack;
}

interface Requestpromisecore {
  name: string;
  severity: string;
  isDirect: boolean;
  via: string[];
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: boolean;
}

interface Minimist {
  name: string;
  severity: string;
  isDirect: boolean;
  via: Via[];
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: boolean;
}

interface Loaderutils {
  name: string;
  severity: string;
  isDirect: boolean;
  via: (Via | string)[];
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: FixAvailable;
}

interface Jsdom {
  name: string;
  severity: string;
  isDirect: boolean;
  via: (Via | string)[];
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: boolean;
}

interface Jestenvironmentjsdomfourteen {
  name: string;
  severity: string;
  isDirect: boolean;
  via: string[];
  effects: any[];
  range: string;
  nodes: string[];
  fixAvailable: boolean;
}

interface Ini {
  name: string;
  severity: string;
  isDirect: boolean;
  via: Via[];
  effects: any[];
  range: string;
  nodes: string[];
  fixAvailable: boolean;
}

interface Happypack {
  name: string;
  severity: string;
  isDirect: boolean;
  via: string[];
  effects: any[];
  range: string;
  nodes: string[];
  fixAvailable: FixAvailable;
}

interface Globparent {
  name: string;
  severity: string;
  isDirect: boolean;
  via: Via[];
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: FixAvailable;
}

interface Via {
  source: number;
  name: string;
  dependency: string;
  title: string;
  url: string;
  severity: string;
  range: string;
}

interface Chokidar {
  name: string;
  severity: string;
  isDirect: boolean;
  via: string[];
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: FixAvailable;
}

interface FixAvailable {
  name: string;
  version: string;
  isSemVerMajor: boolean;
}
