/// <reference types="vite-plugin-electron/electron-env" />
/// <reference path="../types.d.ts" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist
     * │ ├─┬ electron
     * │ │ ├─┬ main
     * │ │ │ └── index.js
     * │ │ └─┬ preload
     * │ │   └── index.js
     * │ ├── index.html
     * │ ├── ...other-static-files-from-public
     * │
     * ```
     */
    DIST: string;
    /** /dist/ or /public/ */
    PUBLIC: string;
  }
}

declare interface BranchInfoItem {
  branch: string;
  version: string;
  recent_commit: string;
  packageJson: any;
}
