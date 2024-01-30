export function useIpc() {
  return {
    send: window.ipcRenderer?.send,
  };
}
