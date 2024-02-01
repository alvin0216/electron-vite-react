declare interface ReleaseHelperValues {
  repo: string;
  repoName: string;
  savePath: string;
  prevBranch: string;
  nextBranch: string;
  codeDiff: string;
  auditReport: string;
  ignoreLock?: boolean;
  gcd: boolean;
  gar: boolean;
  checkDependencies: boolean;
}

declare interface ProjectInfo {
  current: BranchItem;
  branchList: BranchItem[];
}

declare interface BranchItem {
  branch: string;
  isCurrent: boolean;
  isTag: boolean;
  packJson: PackJson;
}

declare interface RCodeDiff {
  diffText: string;
  diffLen: number;
  diffFileName: string;
}

declare interface RAuditReport {
  result: string;
}

interface PackJson {
  name: string;
  productName: string;
  private: boolean;
  version: string;
  description: string;
  author: string;
  license: string;
  main: string;

  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
}

declare interface OutDatedInfo {
  current: string;
  latest: string;
  wanted: string;
  dependent: string;
  location: string;
}

declare interface OutDatedInfo {
  current: string;
  latest: string;
  wanted: string;
  dependent: string;
  location: string;
}

declare interface devDependenceInfo {
  resolved: string;
  version: string;
  problems?: string;
  extraneous?: boolean;
}

declare interface DependenceInfo {
  outdated?: { [key: string]: OutDatedInfo };
}

declare interface DependenceItem {
  name: string;
  version: string;
  latest?: string;
  isLenovo: boolean;
  isOutdated: boolean;
  isDevDependence: boolean;
}
