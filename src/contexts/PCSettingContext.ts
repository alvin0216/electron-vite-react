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

  const { loading, run } = useRequest(async (action = IPCEnum.ReadPCSetting, data?: any) => {
    switch (action) {
      case IPCEnum.ReadPCSetting:
        return invoke(IPCEnum.ReadPCSetting).then(setState);

      case IPCEnum.SetGaming:
        return invoke(IPCEnum.SetGaming, data).then(() => setState({ pcType: data }));

      case IPCEnum.SetCountry:
        return invoke(IPCEnum.SetCountry, data).then(() => setState({ countryCode: data }));

      default:
        return;
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
    setGaming: (pcType: PCTypeEnum) => run(IPCEnum.SetGaming, pcType),
    setCountry: (countryCode: string) => run(IPCEnum.SetCountry, countryCode),
    readPCSetting: () => run(IPCEnum.ReadPCSetting),
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
  readPCSetting: () => void;
}>(
  // @ts-ignore
  null
);
