import { StoreContext } from '@/contexts/StoreContext';
import { useContext } from 'react';

export function useStore() {
  return useContext(StoreContext);
}
