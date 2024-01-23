import { StoreContext } from '@/contexts/storeContext';
import { useContext } from 'react';

export function useStore() {
  return useContext(StoreContext);
}
