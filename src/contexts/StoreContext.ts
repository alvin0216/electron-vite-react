import { createContext } from 'react';
import { useSetState } from 'ahooks';
import { FileStatus } from '@constants/enum';
import SMBInfo from '../../dev/SMBInfo.json';

const defaultState: StoreState = {
  smbInfo: { value: SMBInfo, status: FileStatus.Writeable },
  hypothesis: { value: {}, status: FileStatus.Writeable },
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
