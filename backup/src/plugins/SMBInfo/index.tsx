import useLoading from "@/hooks/useLoading";
import { invokeElectron, send } from "@/lib/bridge";
import { Button, message, Tooltip, TourProps, Tour, Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import ReactJson from "react-json-view";
import RestartVantageButton from "@/components/RestartVantageButton";
import SearchJson from "@/components/SearchJson";
import AlertMessage, { AlertMessageRef } from "@/components/AlertMessage";

import testbench_png from "@/assets/testbench-filesmb.png";
import SnSelector from "./SnSelector";
import { useCacheState } from "@/hooks/useCache";
import { useAppContext } from "@/hooks/useAppContext";
import { EMCEnum, PathEnum } from "@universal/enum";
import SmbEmpty from "./Empty";

interface SMBInfoProps {}

const SMBInfo: React.FC<SMBInfoProps> = (props) => {
  const [json, setJson] = useState<any>({});
  const [{ isGuided }, setState] = useCacheState("smbInfo");

  const [guideOpen, setGuideOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ isVantageShellRuning }] = useAppContext();
  const alertRef = useRef<AlertMessageRef>(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const steps: TourProps["steps"] = [
    {
      title: "SMBInfo Json viewer",
      description: "In this area, you can view or modify configuration files.",
      target: () => ref1.current,
      placement: "right",
    },
    {
      title: "Restart Vantage Service",
      description:
        "If you modify the configuration file, you must restart the vantage service to make the change effective. You can click this button to quickly restart the service.",
      target: () => ref2.current,
    },
    {
      title: "Search in files",
      description:
        "You can enter keywords to search, and the matching results will be displayed below.",
      target: () => ref3.current,
    },
  ];

  const [read, reading] = useLoading(() =>
    invokeElectron(EMCEnum.READ_SMB_FILE).then((json) => {
      setJson(json);
      setIsLoaded(true);
      return json;
    })
  );

  useEffect(() => {
    read().then((json) => {
      if (!isGuided && JSON.stringify(json) !== "{}") setGuideOpen(true);
    });
    window.electronAPI.onSMBFileChange((_event, json) => {
      setJson(json);
    });
  }, []);

  const updateJson = (json: any) => {
    invokeElectron(EMCEnum.UPDATE_SMB_FILE, json).then(() => {
      alertRef.current?.show();
    });
  };

  if (!isLoaded) return null;
  if (JSON.stringify(json) === "{}") return <SmbEmpty read={read} />;
  return (
    <div className="grid grid-cols-2 gap-4">
      <Tour
        open={guideOpen}
        onClose={() => {
          setState((prev) => (prev.isGuided = true));
          setGuideOpen(false);
        }}
        steps={steps}
      />
      <div className="relative">
        <div
          className="z--1 absolute w-60 top-0 h-32px left-0 "
          ref={ref3}
        ></div>
        <SearchJson
          data={json}
          onChange={(key, value) => {
            const newJson = { ...json };
            newJson[key] = value;
            updateJson(newJson);
          }}
        >
          <Tooltip title="You need to restart the service after modifying the file to take effect">
            <RestartVantageButton ref={ref2} />
          </Tooltip>

          <Button
            onClick={() => send(EMCEnum.OPEN_FOLDER, PathEnum.smbFilePath)}
          >
            Open File Path
          </Button>

          <SnSelector
            value={json.LenovoSerialNumber}
            onChange={(LenovoSerialNumber) => {
              invokeElectron(EMCEnum.UPDATE_SMB_FILE, {
                ...json,
                LenovoSerialNumber,
              }).then(() => {
                alertRef.current?.show();
                read();
              });
            }}
          />
        </SearchJson>
      </div>

      <div className="relative overflow-y-auto h-[calc(100vh-190px)]">
        {!isVantageShellRuning && (
          <AlertMessage
            innerRef={alertRef}
            message={
              <>
                Please{" "}
                <span className="font-bold">Restart Vantage Service</span> to
                make the configuration take effect
              </>
            }
          />
        )}
        <div
          ref={ref1}
          style={{ height: "calc(100vh - 300px)" }}
          className="z--1 absolute top-7 left-0 w-100%"
        ></div>
        <ReactJson
          name="SMBInfo.json"
          enableClipboard={false}
          displayDataTypes={false}
          src={json}
          style={{ overflow: "auto" }}
          onEdit={(data) => {
            updateJson(data.updated_src);
          }}
        />
      </div>
    </div>
  );
};

export default SMBInfo;
