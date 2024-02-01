import { contextBridge, ipcRenderer } from "electron";
import { EMCEnum } from "../../universal/enum";

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld("electronAPI", {
  ipcRenderer,
  onJsonChange: (callback) => {
    ipcRenderer.on("onJsonChange", callback);
  },

  onEnvConfigChange: (callback) => {
    ipcRenderer.on(EMCEnum.ON_ENV_CONFIG_FILE_CHANGE, callback);
  },
  onSMBFileChange(callback) {
    ipcRenderer.on(EMCEnum.ON_SMB_FILE_CHANGE, callback);
  },
  onHypothesisChange(callback) {
    ipcRenderer.on(EMCEnum.ON_HYPOTHESIS_CHANGE, callback);
  },
  onLog(callback) {
    ipcRenderer.on(EMCEnum.ON_LOG, callback);
  },
  onCacheFileChange(callback) {
    ipcRenderer.on(EMCEnum.ON_CACHE_FILE_CHANGE, callback);
  },
});
