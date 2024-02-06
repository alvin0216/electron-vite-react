import { CloudContext } from '@/contexts/CloudContext';
import { useContext } from 'react';

export function useCloudConfig() {
  return useContext(CloudContext);
}
