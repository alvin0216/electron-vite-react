import { useState } from "react";

export function useStorageState<V = any>(key: string, defaultValue: V) {
  const [state, setState] = useState<V>(
    (localStorage.getItem(key) as V) || defaultValue
  );

  const update = (value: V) => {
    setState(value);
    localStorage.setItem(key, String(value));
  };

  return [state, update];
}
