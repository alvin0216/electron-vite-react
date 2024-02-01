import { CacheContext } from "@/context/cacheContext";
import { useContext } from "react";

export function useCache() {
  const [state, updator] = useContext(CacheContext);
  return [state, updator] as const;
}

export function useCacheState<K extends keyof CacheState>(key: K) {
  const [state, updator] = useContext(CacheContext);

  const updateValue = (fn: (state: CacheState[K]) => void) => {
    updator((c) => {
      fn(c[key]);
    });
  };

  const setValue = (state: CacheState[K]) => {
    updator((c) => {
      c[key] = state;
    });
  };

  return [state[key], updateValue, setValue] as const;
}
