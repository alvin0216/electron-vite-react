import { createContext, useMemo } from 'react';
import { useLocalStorageState, useRequest } from 'ahooks';
import { StorgeEnum } from '@constants/storage';
import { IPCEnum } from '@constants/enum';
import { useIpc } from '@/hooks/useIpc';
import type { IFuncUpdater } from 'ahooks/lib/createUseStorageState';

export const cdFieldsDefaultValues: PartialCodeDiffFields = {
  repoPath: undefined,
  packageJsonPath: undefined,
  prevBranch: undefined,
  nextBranch: undefined,
  prevVersion: undefined,
  nextVersion: undefined,
  excludePattern: '!package-lock.json',
  repoName: undefined,
};

export function useInitialCodeDiffCtx() {
  const { invoke } = useIpc();

  const template =
    'git diff [prevBranch] [nextBranch] -- [excludePattern] > [repoName]-v[prevVersion]-v[nextVersion].diff';

  const [cdFields, setCDFields] = useLocalStorageState<PartialCodeDiffFields>(StorgeEnum.CodeDiffFields, {
    defaultValue: cdFieldsDefaultValues,
  });

  const {
    run: getRepoInfo,
    loading: fetchingRepoInfo,
    data: repoInfo,
  } = useRequest(
    async () => {
      return invoke(IPCEnum.GetRepoInfo, cdFields?.repoPath) as Promise<RepoInfo>;
    },
    { manual: true }
  );

  const branchOptions = repoInfo?.branches.map?.((b) => ({ value: b.name, label: `${b.name} (${b.version})` }));
  const fetchRepoAccess = !!(cdFields?.repoPath && cdFields?.packageJsonPath);

  const { cmd } = useMemo(() => {
    const prevVersion =
      repoInfo?.branches.find((b) => cdFields?.prevBranch === b.name)?.version || cdFields?.prevVersion;
    const nextVersion =
      repoInfo?.branches.find((b) => cdFields?.nextBranch === b.name)?.version || cdFields?.nextVersion;

    const cmd = template
      .replace('[repoPath]', cdFields?.repoPath || '[repoPath]')
      .replace('[prevBranch]', cdFields?.prevBranch || '[prevBranch]')
      .replace('[nextBranch]', cdFields?.nextBranch || '[nextBranch]')
      .replace('[excludePattern]', cdFields?.excludePattern || '[excludePattern]')
      .replace('[repoName]', cdFields?.repoName || '[repoName]')
      .replace('[prevVersion]', prevVersion || '[prevVersion]')
      .replace('[nextVersion]', nextVersion || '[nextVersion]');
    return { prevVersion, nextVersion, cmd };
  }, [repoInfo, cdFields]);

  const run = () => {
    return invoke(IPCEnum.RunCodeDiff, cdFields);
  };

  return { cmd, branchOptions, fetchRepoAccess, fetchingRepoInfo, getRepoInfo, cdFields, setCDFields, template, run };
}

export const CodeDiffContext = createContext<{
  template: string;
  cmd: string[];
  branchOptions: {
    value: string;
    label: string;
  }[];
  fetchRepoAccess: boolean;
  fetchingRepoInfo: boolean;
  getRepoInfo: () => void;
  setCDFields: (value?: PartialCodeDiffFields | IFuncUpdater<PartialCodeDiffFields> | undefined) => void;
  cdFields: PartialCodeDiffFields;
  run: () => Promise<any>;
}>({} as any);
