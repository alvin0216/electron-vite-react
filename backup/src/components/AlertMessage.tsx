import { Alert } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";
import type { AlertProps } from "antd";

export type AlertMessageRef = { show(): void; close(): void };

interface AlertMessageProps extends AlertProps {
  innerRef?: React.Ref<AlertMessageRef>;
}

const AlertMessage: React.FC<AlertMessageProps> = (props) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(props.innerRef, () => ({
    show: () => setShow(true),
    close: () => setShow(false),
  }));

  return show ? (
    <Alert
      type="info"
      showIcon
      className="mb-2"
      closable
      afterClose={() => setShow(false)}
      {...props}
    />
  ) : null;
};

export default AlertMessage;
