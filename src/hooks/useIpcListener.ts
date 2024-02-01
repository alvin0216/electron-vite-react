import { useMount } from 'ahooks';
import { useStore } from './useStore';
import { IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';

const on = window.ipcRenderer?.on;

export function useIpcListener() {
  const [, setStore] = useStore();
  const { invoke } = useIpc();

  useMount(() => {
    // on?.(IPCEnum.OnFileChange, (_event, ...args) => {
    //   console.log(IPCEnum.OnFileChange, ...args);
    // });

    invoke(IPCEnum.ReadFile)
      .then((res) => {
        console.log('%c res:', 'color: red', res);
      })
      .catch((e) => {
        console.log('%c e:', 'color: red', e);
      });

    on?.(IPCEnum.ReadFile, (_event, ...args) => {
      console.log(IPCEnum.ReadFile, ...args);
    });
  });
}
