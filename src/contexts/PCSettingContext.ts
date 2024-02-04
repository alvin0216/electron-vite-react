import { createContext } from 'react';
import { useBoolean, useLocalStorageState, useRequest, useSetState } from 'ahooks';
import { StorgeEnum } from '@constants/storage';
import countries from '@constants/countries.json';
import { useIpc } from '@/hooks/useIpc';
import { IPCEnum, PCTypeEnum } from '@constants/enum';

interface IState {
  pcType?: PCTypeEnum;
  countryCode?: string;
}

export function useInitialPCSetting() {
  const { invoke } = useIpc();
  const [sortable, { toggle: toggleSortable }] = useBoolean(false);
  const [state, setState] = useSetState<IState>({ pcType: undefined, countryCode: undefined });

  const [countryList, setCountryList] = useLocalStorageState<CountryItem[]>(StorgeEnum.CountryList, {
    defaultValue: countries,
  });
  const [display, setDisplay] = useLocalStorageState(StorgeEnum.CountryDisplay, { defaultValue: 'en' });
  const displayEn = display === 'en';
  const toggleDisplay = () => setDisplay(displayEn ? 'cn' : 'en');

  const { loading, run, error } = useRequest(async (payload: any) => {
    const { action, pcType, countryCode } = payload;
    switch (action) {
      case IPCEnum.SetGaming:
        return invoke(IPCEnum.SetGaming).then(() => setState({ pcType }));

      case IPCEnum.SetCountry:
        return invoke(IPCEnum.SetGaming).then(() => setState({ countryCode }));

      default:
        return invoke(IPCEnum.ReadPCSetting).then((res) => {
          console.debug('%c 1111', 'color: red', res);
          setState(res);
        });
    }
  });

  return {
    ...state,
    sortable,
    toggleSortable,
    displayEn,
    toggleDisplay,
    countryList,
    setCountryList,
    loading,
    setGaming: (pcType: PCTypeEnum) => run({ action: IPCEnum.SetGaming, pcType }),
    setCountry: (countryCode: string) => run({ action: IPCEnum.SetCountry, countryCode }),
  };
}

export const PCSettingContext = createContext<{
  loading: boolean;
  pcType?: PCTypeEnum;
  countryCode?: string;
  displayEn: boolean;
  toggleDisplay: () => void;
  sortable: boolean;
  toggleSortable(): void;
  countryList: CountryItem[];
  setCountryList: (c: CountryItem[]) => void;
  setGaming: (pcType: PCTypeEnum) => void;
  setCountry: (countryCode: string) => void;
}>(
  // @ts-ignore
  null
);
