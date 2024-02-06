import { createContext, useEffect, useMemo } from 'react';
import { useLocalStorageState, useRequest, useSetState } from 'ahooks';
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
  excludePattern: ':!package-lock.json',
  repoName: undefined,
};

export function useInitialCodeDiffCtx() {
  const { invoke } = useIpc();
  const template =
    'git diff [prevBranch] [nextBranch] -- [excludePattern] > [repoName]-v[prevVersion]-v[nextVersion].diff';

  const [{ diffLine, packagediffText }, setState] = useSetState({ diffLine: 0, packagediffText: undefined });
  const [cdFields, setCDFields] = useLocalStorageState<PartialCodeDiffFields>(StorgeEnum.CodeDiffFields, {
    defaultValue: cdFieldsDefaultValues,
  });

  const fetchRepoAccess = !!(cdFields?.repoPath && cdFields?.packageJsonPath);

  const {
    run: getRepoInfo,
    loading: fetchingRepoInfo,
    data: repoInfo,
  } = useRequest(
    async () => {
      return invoke(IPCEnum.GetRepoInfo, {
        repoPath: cdFields?.repoPath,
        packageJsonPath: cdFields?.packageJsonPath,
      }) as Promise<RepoInfo>;
    },
    { manual: true }
  );

  const { cmd, filename } = useMemo(() => {
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

    const filename = cmd.split(' > ')[1];

    return { prevVersion, nextVersion, cmd, filename };
  }, [repoInfo, cdFields]);

  const run = async () => {
    const { diffLine, packagediffText } = await invoke(IPCEnum.RunCodeDiff, { ...cdFields, filename });
    setState({ diffLine, packagediffText });
    return true;
  };

  const getTag = (diffLine: number) => {
    if (diffLine < 1000) return 'Small';
    else if (diffLine < 10000) return 'Medium';
    return 'Large';
  };

  const diffSize = useMemo(() => {
    if (diffLine < 1000) return 'Small';
    else if (diffLine < 10000) return 'Medium';
    return 'Large';
  }, [diffLine]);

  const reset = () => {
    setCDFields(cdFieldsDefaultValues);
    setState({ diffLine: 0, packagediffText: undefined });
  };

  return {
    reset,
    cmd,
    repoInfo,
    fetchRepoAccess,
    fetchingRepoInfo,
    getRepoInfo,
    cdFields,
    setCDFields,
    template,
    run,
    diffSize,
    diffLine,
    filename,
    packagediffText,
    cdFieldsDefaultValues,
  };
}

export const CodeDiffContext = createContext<{
  repoInfo?: RepoInfo;
  cdFieldsDefaultValues: PartialCodeDiffFields;
  template: string;
  cmd: string;
  fetchRepoAccess: boolean;
  fetchingRepoInfo: boolean;
  getRepoInfo: () => void;
  setCDFields: (value?: PartialCodeDiffFields | IFuncUpdater<PartialCodeDiffFields> | undefined) => void;
  cdFields: PartialCodeDiffFields;
  run: () => Promise<any>;
  filename: string;
  diffSize: string;
  diffLine: number;
  packagediffText: string;
  reset: () => void;
}>({} as any);
