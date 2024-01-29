import { useMount } from 'ahooks';
import { useStore } from './useStore';

export function useIpcListener() {
  const [, setStore] = useStore();
  useMount(() => {
    window.ipcRenderer?.on('file-change', (_event, ...args) => {
      console.log('file-change', ...args);
    });
  });
}
