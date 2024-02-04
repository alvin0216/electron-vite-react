import { PCSettingContext } from '@/contexts/PCSettingContext';
import { useContext } from 'react';

export function usePCSetting() {
  return useContext(PCSettingContext);
}
