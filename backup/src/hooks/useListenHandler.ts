import { useEffect } from "react";
import { EMCEnum } from "@universal/enum";
import { message } from "antd";

export function useListenHandler() {
  useEffect(() => {
    window.electronAPI.onLog((_event, log) => {
      console.error(log);
    });

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "F12") {
        window.electronAPI.ipcRenderer.send(EMCEnum.OPEN_DEV_TOOLS);
      }
    }
    window.addEventListener("keydown", handleKeydown, false);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
}
