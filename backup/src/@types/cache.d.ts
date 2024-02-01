declare interface CacheState {
  tabKey: TabKey;
  envTools: { appType: "non-beta" | "beta"; disabledAlert: boolean };
  transition: {
    source?: string;
    projectPath?: string;
    spaces: 2 | 4;
    sort: boolean;
  };
  smbInfo: { isGuided: boolean; snList: SnItem[] };
  releaseHelper: ReleaseHelperValues;
}

declare type TabKey = keyof CacheState | "tabKey";
// | "envTools"
// | "smbInfo"
// | "hypothesis"
// | "translation"
// | "releaseHelper"
// | "advanced";

declare type ReleaseStepKey = "" | "codeDiff" | "sha256" | "auditReport";

declare interface AppCache {
  snList: SnItem[];
}
declare interface SnItem {
  remark: string;
  serialNumber: string;
}

declare interface SnListItem extends SnItem {
  key: number;
}
