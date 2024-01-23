import { useMount } from 'ahooks';
import { useStore } from './useStore';

export function useIpcListener() {
  const [, setStore] = useStore();
  useMount(() => {
    window.ipcRenderer.on('main-process-message', (_event, ...args) => {
      console.log('[Receive Main-process message]:2222', ...args);
    });
  });
}
