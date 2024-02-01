import { useMount } from 'ahooks';
import { useStore } from './useStore';
import { IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';

export function useIpcListener() {
  const [, setStore] = useStore();
  const { on, invoke } = useIpc();

  useMount(() => {
    invoke(IPCEnum.ReadFile)
      .then((res) => {
        setStore(res);
      })
      .catch((e) => {
        console.debug(`%c ${IPCEnum.ReadFile} Error:`, 'color: red', e);
      });

    on?.(IPCEnum.OnFileChange, (_event, args) => {
      setStore(args);
    });
  });
}
