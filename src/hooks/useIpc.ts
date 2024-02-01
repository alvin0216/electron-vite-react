export function useIpc() {
  return {
    send: window.ipcRenderer?.send,
    on: window.ipcRenderer?.on,
    invoke: window.ipcRenderer?.invoke,
  };
}
