interface EnvConfig {
  EntryUrl: string;
  CertPin: "on" | "off";
  [key: string]: any;
}

declare interface ReadHypothesis {
  isFileExist: boolean;
  hypothesis: {};
  isFileWritable: boolean;
}
