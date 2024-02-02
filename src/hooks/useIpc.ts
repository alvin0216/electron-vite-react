import { isDevOnWeb } from '@/env';

export function useIpc() {
  if (isDevOnWeb)
    return {
      send: () => {},
      on: () => {},
      invoke: async () => {},
    };

  return {
    send: window.ipcRenderer?.send,
    on: window.ipcRenderer?.on,
    invoke: window.ipcRenderer?.invoke,
  };
}
