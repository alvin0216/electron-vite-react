/// <reference types="vite/client" />
/// <reference path="../types.d.ts" />

export {};
declare global {
  interface Window {
    electronAPI: {
      ipcRenderer: import("electron").IpcRenderer;
      onJsonChange: FileChange;

      onEnvConfigChange: FileChange<EnvConfig>;
      onSMBFileChange: FileChange;
      onHypothesisChange: FileChange;
      onLog: (fn: (_event: any, data: any) => void) => void;
      onCacheFileChange: (fn: (_event: any, data: any) => void) => void;
    };
  }
}

type FileChange<T = any> = (fn: (_event: any, value: T) => void) => void;

declare type APIKey =
  | "userSetting"
  | "SMBInfo"
  | "betaConfigJson"
  | "nonBetaConfigJson";
