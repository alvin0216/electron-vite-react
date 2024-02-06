import { createContext } from 'react';
import { useLocalStorageState } from 'ahooks';
import { StorgeEnum } from '@constants/storage';

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
  setSnList: (value?: SNItem[] | any) => void;
  setMtmList: (value?: MtmItem[] | any) => void;
  setFilters: (value: string[]) => void;
}>({
  snList: [],
  setSnList: () => {},
  mtmList: [],
  setMtmList: () => {},
  filters: [],
  setFilters: () => {},
});
