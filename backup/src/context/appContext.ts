import { createContext } from "react";
import { ImmerHook } from "use-immer";

export const defaultAppState = {
  isVantageShellRuning: false,
};

export const AppContext = createContext<ImmerHook<typeof defaultAppState>>([
  defaultAppState,
  () => {},
]);
