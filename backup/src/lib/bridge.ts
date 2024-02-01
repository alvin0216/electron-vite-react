import { Modal } from "antd";
import { EMCEnum } from "@universal/enum";

export function invokeElectron<R = any>(
  key: EMCEnum,
  params?: any
): Promise<R> {
  return window.electronAPI.ipcRenderer.invoke(key, params);
}

export const send = window.electronAPI.ipcRenderer.send;

export function ipcInvoke<R = any>(key: string, params?: any): Promise<R> {
  return window.electronAPI.ipcRenderer.invoke(key, params);
}
export const ipcSend = window.electronAPI.ipcRenderer.send;
