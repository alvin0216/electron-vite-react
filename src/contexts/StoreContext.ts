import { createContext } from 'react';
import { useSetState } from 'ahooks';
import { randomJson } from './random';

const defaultState: StoreState = {
  smbInfo: randomJson,
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
