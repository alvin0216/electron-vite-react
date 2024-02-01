import { invokeElectron, send } from "@/lib/bridge";
import { Alert, Badge, Button, message, Space, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import ReactJson from "react-json-view";
import RestartVantageButton from "@/components/RestartVantageButton";
import SearchJson from "@/components/SearchJson";
import AlertMessage, { AlertMessageRef } from "@/components/AlertMessage";
import { useAppContext } from "@/hooks/useAppContext";
import { EMCEnum, PathEnum } from "@universal/enum";
import { useImmer } from "use-immer";

interface HypothesisProps {}

const Hypothesis: React.FC<HypothesisProps> = (props) => {
  const [state, updateState] = useImmer({
    isloaded: false,
    isFileExist: undefined as boolean | undefined,
    hypothesis: {} as any,
    isFileWritable: false,
  });

  const [{ isVantageShellRuning }] = useAppContext();
  const alertRef = useRef<AlertMessageRef>(null);

  useEffect(() => {
    invokeElectron<ReadHypothesis>(EMCEnum.READ_HYPOTHESIS).then((result) => {
      updateState((prev) => ({ ...prev, ...result, isloaded: true }));
    });
    window.electronAPI.onHypothesisChange((_event, result: ReadHypothesis) => {
      console.log(result);
      updateState((prev) => ({ ...prev, ...result }));
    });
  }, []);

  const updateHypFile = (json: any) => {
    if (!state.isFileWritable) {
      return;
    }

    invokeElectron(EMCEnum.UPDATE_HYPOTHESIS, json).then(() => {
      alertRef.current?.show();
    });
  };

  if (!state.isloaded) return null;
  if (!state.isFileExist)
    return (
      <div>
        The hypothesis file does not exist, please restart vantage and try
        again.
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <SearchJson
          data={state.hypothesis?.Choiceses || {}}
          title="Choiceses Search Result"
          onChange={
            !state.isFileWritable
              ? undefined
              : (key, value) => {
                  const json = JSON.parse(JSON.stringify(state.hypothesis));
                  json.Choiceses[key] = value;
                  updateHypFile(json);
                }
          }
        >
          <Tooltip title="You need to restart the service after modifying the file to take effect">
            <RestartVantageButton />
          </Tooltip>

          <Button
            onClick={() =>
              send(EMCEnum.OPEN_FOLDER, PathEnum.hypothesisFilePath)
            }
          >
            Open File Path
          </Button>
        </SearchJson>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-190px)]">
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

        <div className="mb-4">
          <Badge
            status={state.isFileWritable ? "processing" : "warning"}
            text={
              state.isFileWritable ? "File is writable" : "File is readonly"
            }
          ></Badge>

          <a
            className="ml-4"
            onClick={() =>
              invokeElectron(EMCEnum.SET_HYPOTHESIS_STATUS, {
                isFileWritable: !state.isFileWritable,
              })
            }
          >
            {state.isFileWritable ? "set readonly" : "set writable"}
          </a>
        </div>
        <ReactJson
          name="hypothesis.config"
          enableClipboard={false}
          displayDataTypes={false}
          src={state.hypothesis}
          style={{ overflow: "auto" }}
          onEdit={
            !state.isFileWritable
              ? false
              : (data) => updateHypFile(data.updated_src)
          }
          onAdd={
            !state.isFileWritable
              ? false
              : (data) => updateHypFile(data.updated_src)
          }
          onDelete={
            !state.isFileWritable
              ? false
              : (data) => updateHypFile(data.updated_src)
          }
        />
      </div>
    </div>
  );
};

export default Hypothesis;
