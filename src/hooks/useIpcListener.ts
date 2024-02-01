import { useMount } from 'ahooks';
import { useStore } from './useStore';
import { IPCEnum } from '@constants/enum';

export function useIpcListener() {
  const [, setStore] = useStore();
  useMount(() => {
    window.ipcRenderer?.on(IPCEnum.OnFileChange, (_event, ...args) => {
      console.log('file-change', ...args);
      // setStore()
    });
  });
}
