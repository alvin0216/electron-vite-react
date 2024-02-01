import { Tabs } from "antd";

import { useEffect } from "react";
import { useImmer } from "use-immer";

import logo from "./assets/logo.png";
import EnvTools from "./plugins/EnvTools";

import { CacheContext, defaultCacheState } from "./context/cacheContext";
import { useCache } from "./hooks/useCache";
import { AppContext, defaultAppState } from "./context/appContext";
import { useListenHandler } from "./hooks/useListenHandler";

import ComputerSetting from "./plugins/ComputerSetting";
import Advanced from "./plugins/Advanced";
import Translation from "./plugins/Translation";
import Hypothesis from "./plugins/Hypothesis";
import ReleaseHelper from "./plugins/ReleaseHelper";
import SMBInfo from "./plugins/SMBInfo";

const tabs = [
  {
    label: "Env Tools",
    key: "envTools",
    children: <EnvTools />,
  },
  {
    label: "ComputerSetting",
    key: "computerSetting",
    children: <ComputerSetting />,
  },
  {
    label: "SMBInfo",
    key: "smbInfo",
    children: <SMBInfo />,
  },
  {
    label: "Hypothesis",
    key: "translation",
    children: <Hypothesis />,
  },
  {
    label: "Translation",
    key: "Translation",
    children: <Translation />,
  },
  {
    label: "Release Helper",
    key: "releaseHelper",
    children: <ReleaseHelper />,
  },
  {
    label: "Advanced",
    key: "advanced",
    children: <Advanced />,
  },
];

const App: React.FC = () => {
  useListenHandler();
  const [{ tabKey }, update] = useCache();

  return (
    <>
      <div className="flex justify-between pl-24 pt-24 items-center text-16">
        <div className="flex">
          <img src={logo} className="w-60px text-center align-middle" alt="" />

          <div className="pl-16 font-500 subpixel-antialiased">
            Lenovo Vantage
            <div className="c-gray">
              <sub>Make life lucky and happy</sub>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        className="main-tabs"
        size="large"
        defaultActiveKey={tabKey}
        onChange={(value) =>
          update((c) => {
            c.tabKey = value as TabKey;
          })
        }
        items={tabs}
      />
    </>
  );
};

const Provider: React.FC = () => {
  const appContextValue = useImmer(defaultAppState);
  const [state, updater] = useImmer(defaultCacheState);

  useEffect(() => {
    console.debug("%c cache-state", "color:#48b04c;font-weight:bold;", state);

    const saveStateBeforeUnload = () => {
      localStorage.setItem("cache-state", JSON.stringify(state));
    };

    window.addEventListener("beforeunload", saveStateBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", saveStateBeforeUnload);
    };
  }, [state]);

  return (
    <AppContext.Provider value={appContextValue}>
      <CacheContext.Provider value={[state, updater]}>
        <App />
      </CacheContext.Provider>
    </AppContext.Provider>
  );
};

export default Provider;
