import { AppContext } from "@/context/appContext";
import { useContext } from "react";

export function useAppContext() {
  return useContext(AppContext);
}
