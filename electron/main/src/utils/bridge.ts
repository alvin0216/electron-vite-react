import { BrowserWindow, ipcMain } from 'electron';

export function useBridge(win: BrowserWindow) {
  return {
    /** send message to web */
    sendToWeb: win?.webContents.send!,
    /** recieve web message */
    on: ipcMain.on,
    /** handle web message and return promise to web  */
    handle: ipcMain.handle,
  };
}
