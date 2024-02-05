import { CodeDiffContext } from '@/contexts/CodeDiffContext';
import { useContext } from 'react';

export function useCodediffCtx() {
  return useContext(CodeDiffContext);
}
