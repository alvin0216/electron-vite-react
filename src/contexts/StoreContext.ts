import { createContext } from 'react';
import { useSetState } from 'ahooks';

const defaultState: StoreState = {
  smbInfo: {},
  hypothesis: { Choiceses: {} },
  configJson: {},
  betaConfigJson: {},
  service: {
    bootingDot: false,
    status: 'default',
  },
};

export function useInitialStore() {
  return useSetState(defaultState);
}

export const StoreContext = createContext<StoreCTX>([defaultState, () => {}]);
