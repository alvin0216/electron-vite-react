import { createContext } from 'react';
import { useLocalStorageState } from 'ahooks';
import { StorgeEnum } from '@constants/storage';
import { IFuncUpdater } from 'ahooks/lib/createUseStorageState';

export function useInitialSMBCache() {
  const [snList, setSnList] = useLocalStorageState<SNItem[]>(StorgeEnum.SnList, { defaultValue: [] });
  const [mtmList, setMtmList] = useLocalStorageState<MtmItem[]>(StorgeEnum.MtmList, { defaultValue: [] });

  return {
    snList,
    setSnList,
    mtmList,
    setMtmList,
  };
}

export const SMBCacheContext = createContext<{
  snList: SNItem[];
  mtmList: MtmItem[];
  setSnList: (value?: SNItem[] | IFuncUpdater<SNItem[]> | undefined) => void;
  setMtmList: (value?: MtmItem[] | IFuncUpdater<SNItem[]> | undefined) => void;
}>({
  snList: [],
  setSnList: () => {},
  mtmList: [],
  setMtmList: () => {},
});
