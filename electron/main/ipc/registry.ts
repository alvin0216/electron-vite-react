import { IPCEnum, PCTypeEnum } from '@constants/enum';
import shelljs from 'shelljs';
import { BrowserWindow, ipcMain } from 'electron';

shelljs.config.execPath = String(shelljs.which('node'));

export function ipcRegistry(win: BrowserWindow) {
  const { readPCInfo, setPcType, setCountry } = useRegistry();

  ipcMain.handle(IPCEnum.ReadPCSetting, () => readPCInfo());
  ipcMain.handle(IPCEnum.SetGaming, (args, type: PCTypeEnum) => setPcType(type));
  ipcMain.handle(IPCEnum.SetCountry, (args, countryCode: string) => setCountry(countryCode));
}

function useRegistry() {
  enum RegistryEnum {
    Gaming = 'HKLM\\SOFTWARE\\WOW6432Node\\Lenovo\\ImController\\Applicability\\Tags',
    Country = 'HKCU\\Control Panel\\International\\Geo',
  }
  const gamingTag = 'System.Profile.Gaming';
  const cmd = {
    queryGaming: `reg query ${RegistryEnum.Gaming} /v ${gamingTag} 2>nul | findstr ${gamingTag}`,
    readCountry: `reg query "${RegistryEnum.Country}" /v Name 2>nul | findstr Name`,
    setGaming: `reg add ${RegistryEnum.Gaming} /v ${gamingTag} /t REG_SZ /d true /f`,
    setNotGaming: `reg delete ${RegistryEnum.Gaming} /v ${gamingTag} /f`,
    setCountry: (countryCode: string) => `reg add "${RegistryEnum.Country}" /v Name /t REG_SZ /d ${countryCode} /f`,
  };

  return {
    readPCInfo: () => {
      const str1 = shelljs.exec(cmd.queryGaming, { silent: true }).stdout;
      const str2 = shelljs.exec(cmd.readCountry).stdout;


      return {
        pcType: str1.match(/(\w+)\r\n/)?.[1] ? PCTypeEnum.Gaming : PCTypeEnum.NotGaming,
        countryCode: str2.match(/(\w+)\r\n/)?.[1], // return counrty code
      };
    },
    setPcType: (type: PCTypeEnum) => {
      const _cmd = type === PCTypeEnum.Gaming ? cmd.setGaming : cmd.setNotGaming;
      return shelljs.exec(_cmd, { silent: true });
    },

    setCountry: (countryCode: string) => {
      return shelljs.exec(cmd.setCountry(countryCode), { silent: true });
    },
  };
}
