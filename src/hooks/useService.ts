import { useStore } from './useStore';
import { useIpc } from './useIpc';
import { IPCEnum } from '@constants/enum';
import { message } from 'antd';

const successMap = {
  start: 'Vantage Service started',
  stop: 'Vantage Service stopped',
  reboot: 'Vantage Service rebooted',
};

export function useService(action: ServiceAction) {
  const [{ service }, setStore] = useStore();
  const { status, bootingDot } = service;
  const { invoke } = useIpc();

  const run = () => {
    setStore({ service: { bootingDot: false, status: action } });

    invoke(IPCEnum.ServiceBin, action)
      .then(() => {
        message.success(successMap[action]);
        setStore({ service: { bootingDot: false, status: 'default' } });
      })
      .catch(() => {
        setStore({ service: { bootingDot: false, status: 'default' } });
      });
  };

  return {
    dot: action === 'reboot' && bootingDot,
    status,
    run,
    disabled: status !== action && status !== 'default',
    running: status === action,
  };
}
