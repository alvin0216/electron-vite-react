import { Button, message } from "antd";
import RestartVantageButton from "@/components/RestartVantageButton";
import { useAppContext } from "@/hooks/useAppContext";
import { invokeElectron } from "@/lib/bridge";
import { EMCEnum } from "@universal/enum";

interface VantageBinProps {}

const VantageBin: React.FC<VantageBinProps> = (props) => {
  const [{ isVantageShellRuning }, updateCtx] = useAppContext();

  const runShell = (type: "stop" | "start") => {
    updateCtx((pre) => {
      pre.isVantageShellRuning = true;
    });

    if (type === "start") {
      invokeElectron(EMCEnum.START_VANTAGE_SERVICE)
        .then((res) => {
          message.success("Vantage Service started");
        })
        .catch(() => {
          message.error("Vantage Service started failed");
        })
        .finally(() => {
          updateCtx((pre) => {
            pre.isVantageShellRuning = false;
          });
        });
    } else {
      invokeElectron(EMCEnum.STOP_VANTAGE_SERVICE)
        .then((res) => {
          message.success("Vantage Service stopped");
        })
        .catch(() => {
          message.error("Vantage Service stopped failed");
        })
        .finally(() => {
          updateCtx((pre) => {
            pre.isVantageShellRuning = false;
          });
        });
    }
  };

  return (
    <div className="space-x-8">
      <Button
        danger
        onClick={() => runShell("stop")}
        loading={isVantageShellRuning}
      >
        Stop Vantage
      </Button>
      <Button
        type="primary"
        loading={isVantageShellRuning}
        onClick={() => runShell("start")}
      >
        Start Vantage
      </Button>
      <RestartVantageButton />
    </div>
  );
};

export default VantageBin;
