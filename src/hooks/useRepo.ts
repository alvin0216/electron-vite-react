import { useLocalStorageState, useRequest } from 'ahooks';
import { useIpc } from './useIpc';
import { IPCEnum } from '@constants/enum';
import { StorgeEnum } from '@constants/storage';

export function useRepo() {
  const { invoke } = useIpc();
  const {
    run: getRepoInfo,
    loading,
    data,
  } = useRequest((path: string) => invoke(IPCEnum.GetRepoInfo, path), { manual: true });
  const [] = useLocalStorageState(StorgeEnum.SSRB);

  return {
    repoInfo: {
      branches: [
        { name: 'branchA', version: '1.1.0' },
        { name: 'branchB', version: '1.1.2' },
      ],
    },
    getRepoInfo,
    loading,
  };
}
