import { useState } from "react";

export default function useBoolean(defaultValue = false) {
  const [isTrue, set] = useState(defaultValue);

  const setTrue = () => set(true);
  const setFalse = () => set(false);

  return [isTrue, { setTrue, setFalse }] as const;
}
