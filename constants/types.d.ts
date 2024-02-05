declare namespace IPCPayload {
  export interface Tran {
    source: { name: string; path: string }[];
    target: { name: string; path: string }[];
    indentation: '2' | '4';
    sort: boolean;
  }
}

declare interface RepoInfo {
  branches: { name: string; version: string }[];
}

declare interface CodeDiffFields {
  repoPath: string;
  repoName: string;
  packageJsonPath: string;
  prevBranch: string;
  nextBranch: string;
  prevVersion: string;
  nextVersion: string;
  excludePattern: string;
}
