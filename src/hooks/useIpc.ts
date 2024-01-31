export function useIpc() {
  return {
    send: window.ipcRenderer?.send,
    invoke: window.ipcRenderer?.invoke,
  };
}
