import { createContext } from 'react';
import { useSetState } from 'ahooks';

const defaultState: StoreState = {
  smbInfo: undefined,
  hypothesis: undefined,
  configJson: undefined,
  betaConfigJson: undefined,
};

export function useInitialStore() {
  return useSetState(defaultState);
}

export const StoreContext = createContext<StoreCTX>([defaultState, () => {}]);
