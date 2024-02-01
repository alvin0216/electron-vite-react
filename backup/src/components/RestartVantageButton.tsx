import { useAppContext } from "@/hooks/useAppContext";
import { invokeElectron } from "@/lib/bridge";
import { Button, message } from "antd";
import { forwardRef } from "react";
import { EMCEnum } from "@universal/enum";

interface RestartVantageButtonProps {
  ref?: any;
}

const RestartVantageButton: React.FC<RestartVantageButtonProps> = forwardRef(
  (props, ref: any) => {
    const [{ isVantageShellRuning }, updateCtx] = useAppContext();

    const reboot = () => {
      updateCtx((pre) => {
        pre.isVantageShellRuning = true;
      });
      invokeElectron(EMCEnum.RESTART_VANTAGE_SERVICE)
        .then((res) => {
          message.success("Vantage Service Reboot Successfully");
        })
        .catch(() => {
          message.error("Vantage Service Reboot Failed");
        })
        .finally(() => {
          updateCtx((pre) => {
            pre.isVantageShellRuning = false;
          });
        });
    };

    return (
      <Button
        ref={ref}
        type="primary"
        loading={isVantageShellRuning}
        onClick={reboot}
      >
        Restart Vantage Service
      </Button>
    );
  }
);

export default RestartVantageButton;
