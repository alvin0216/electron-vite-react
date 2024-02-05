import { createContext } from 'react';
import { useLocalStorageState } from 'ahooks';
import { StorgeEnum } from '@constants/storage';
import type { IFuncUpdater } from 'ahooks/lib/createUseStorageState';

export function useInitialSSRB() {
  const [info, setInfo] = useLocalStorageState<Partial<CodeDiffFields>>(StorgeEnum.SSRB, { defaultValue: {} });
  return { info, setInfo };
}

export const SSRBContext = createContext<{
  snList: SNItem[];
  mtmList: MtmItem[];
  filters: string[];
  setSnList: (value?: SNItem[] | IFuncUpdater<SNItem[]> | undefined) => void;
  setMtmList: (value?: MtmItem[] | IFuncUpdater<SNItem[]> | undefined) => void;
  setFilters: (value: string[]) => void;
}>({
  snList: [],
  setSnList: () => {},
  mtmList: [],
  setMtmList: () => {},
  filters: [],
  setFilters: () => {},
});
