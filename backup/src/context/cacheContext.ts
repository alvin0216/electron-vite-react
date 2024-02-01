import { createContext } from "react";
import { VantageAppTypeEnum } from "@universal/enum";
import { ImmerHook } from "use-immer";

export const cacheInitializer = (): CacheState => {
  const storedState = localStorage.getItem("cache-state");

  const defaultState: CacheState = {
    tabKey: "envTools",
    envTools: { appType: VantageAppTypeEnum.beta, disabledAlert: false },
    transition: {
      spaces: 2,
      sort: true,
      projectPath: undefined,
      source: undefined,
    },
    smbInfo: { isGuided: false, snList: [] },
    releaseHelper: {
      repo: "",
      repoName: "",
      savePath: "",
      prevBranch: "",
      nextBranch: "",
      codeDiff: "",
      auditReport: "",
      gcd: true,
      gar: true,
      checkDependencies: true,
    },
  };

  if (storedState) {
    return {
      ...defaultState,
      ...JSON.parse(storedState),
      releaseHelper: defaultState.releaseHelper,
    };
  } else {
    return defaultState;
  }
};

export const defaultCacheState = cacheInitializer();

export const CacheContext = createContext<ImmerHook<CacheState>>([
  defaultCacheState,
  () => {},
]);
