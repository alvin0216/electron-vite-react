import { createContext } from 'react';
import { useSetState } from 'ahooks';

const defaultState: StoreState = {
  smbInfo: {},
};

export function useInitialStore() {
  return useSetState(defaultState);
}

export const StoreContext = createContext<StoreCTX>([defaultState, () => {}]);
