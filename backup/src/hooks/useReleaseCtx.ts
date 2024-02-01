import { ReleaseContext } from "@/context/releaseContext";
import { useContext } from "react";

export default function useReleaseCtx() {
  return useContext(ReleaseContext);
}
