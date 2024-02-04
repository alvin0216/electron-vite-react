import { useEventListener, useMount } from 'ahooks';
import { useStore } from './useStore';
import { IPCEnum } from '@constants/enum';
import { useIpc } from './useIpc';

export function useIpcListener() {
  const [, setStore] = useStore();
  const { send, on, invoke } = useIpc();

  useMount(() => {
    invoke(IPCEnum.ReadFile)
      .then((res) => {
        if (res.hypothesis) setStore(res);
      })
      .catch((e) => {
        console.debug(`%c ${IPCEnum.ReadFile} Error:`, 'color: red', e);
      });

    on?.(IPCEnum.OnFileChange, (_event, res) => {
      console.log('OnFileChange', res);
      setStore(res);
    });
  });

  useEventListener('keydown', (e) => {
    if (e.key === 'F12') send(IPCEnum.OpenDevTools);
  });
}
