import { useRequest } from 'ahooks';
import { useIpc } from './useIpc';
import { IPCEnum } from '@constants/enum';

export function useRepo() {
  const { invoke } = useIpc();
  const {
    run: getRepoInfo,
    loading,
    data,
  } = useRequest((path: string) => invoke(IPCEnum.GetRepoInfo, path), { manual: true });

  return { repoInfo: data as Repo, getRepoInfo, loading };
}
