import { useStore } from './useStore';
import { useIpc } from './useIpc';
import { IPCEnum } from '@enum/index';

export function useService(action: ServiceAction) {
  const [{ service }, setStore] = useStore();
  const { status, bootingDot } = service;
  const { invoke } = useIpc();

  const run = () => {
    setStore({ service: { ...service, status: action } });
    invoke(IPCEnum.ChangeServiceStatus, action)
      .then(() => {
        setStore({ service: { bootingDot: false, status: 'default' } });
      })
      .catch(() => {
        setStore({ service: { ...service, status: 'default' } });
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
