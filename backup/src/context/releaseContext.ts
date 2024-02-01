import { createContext } from "react";
import { ImmerHook } from "use-immer";

export enum loadingTextEnum {
  none = "",
  fetchRepo = "Fetching repository infomation",
  runCheckDev = "Checking dependencies",
  runCodeDiff = "Generating code diff file",
  runAuditReport = "Generating audit report file",
}

export const defaultReleaseState: ReleseHelperState = {
  project: undefined,
  loadingText: loadingTextEnum.none,
  diffFileName: "",
  diffText: "",
  diffLen: 0,
  dependenceInfo: { outdated: undefined },
};

export const ReleaseContext = createContext<ImmerHook<ReleseHelperState>>([
  defaultReleaseState,
  () => {},
]);

declare interface ReleseHelperState extends RCodeDiff {
  project?: ProjectInfo;
  loadingText: loadingTextEnum;
  dependenceInfo: DependenceInfo;
  auditReportJson?: AuditReportJson;
}
