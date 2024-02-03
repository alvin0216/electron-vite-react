import { createContext } from 'react';
import { useLocalStorageState } from 'ahooks';
import { StorgeEnum } from '@constants/storage';
import { IFuncUpdater } from 'ahooks/lib/createUseStorageState';

export function useInitialSMBCache() {
  const [snList, setSnList] = useLocalStorageState<SNItem[]>(StorgeEnum.SnList, { defaultValue: [] });
  const [mtmList, setMtmList] = useLocalStorageState<MtmItem[]>(StorgeEnum.MtmList, { defaultValue: [] });
  const [filters, setFilters] = useLocalStorageState<string[]>(StorgeEnum.SMBFilters, { defaultValue: [] });

  return {
    snList,
    setSnList,
    mtmList,
    setMtmList,
    filters,
    setFilters,
  };
}

export const SMBCacheContext = createContext<{
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
