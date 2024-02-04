import { createContext } from 'react';
import { useSetState } from 'ahooks';
import { FileStatus } from '@constants/enum';

const defaultState: StoreState = {
  smbInfo: { value: {}, status: FileStatus.NotFound },
  hypothesis: { value: {}, status: FileStatus.Readonly },
  configJson: { value: {}, status: FileStatus.Writeable },
  betaConfigJson: { value: {}, status: FileStatus.Writeable },
  service: {
    bootingDot: false,
    status: 'default',
  },
};

export function useInitialStore() {
  return useSetState(defaultState);
}

export const StoreContext = createContext<StoreCTX>([defaultState, () => {}]);
