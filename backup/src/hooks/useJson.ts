import { ipcInvoke, ipcSend } from "@/lib/bridge";
import { useEffect, useState } from "react";

export function useJson(key: APIKey) {
  const [loading, setLoading] = useState(false);
  const [json, setJson] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    ipcInvoke("readJson", key)
      .then(setJson)
      .finally(() => setLoading(false));

    window.electronAPI.onJsonChange((_event, result) => {
      if (key === result.key) setJson(result.json);
    });
  }, [key]);

  const openFile = () => {
    ipcSend("showItemInFolder", key);
  };

  const updateJson = (newJson: any) => {
    ipcSend("updateJson", { key, json: newJson });
  };

  return { json, loading, openFile, updateJson };
}
