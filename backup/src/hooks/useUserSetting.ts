import { useState } from "react";

export function useUserSetting() {
  const [userSetting, setUserSetting] = useState({
    vantageType: "non-beta",
    snList: [],
    countryPerfer: "",
  });

  return { userSetting, setUserSetting };
}
