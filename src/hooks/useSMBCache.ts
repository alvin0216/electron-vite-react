import { SMBCacheContext } from '@/contexts/SMBCacheContext';
import { useContext } from 'react';

export function useSMBCache() {
  return useContext(SMBCacheContext);
}
