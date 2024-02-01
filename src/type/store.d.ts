declare interface StoreState {
  smbInfo: FileItem;
  hypothesis: FileItem;
  configJson: FileItem;
  betaConfigJson: FileItem;
  service: {
    bootingDot: boolean;
    status: ServiceAction | 'default';
  };
}

type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

type StoreCTX = [StoreState, SetState<StoreState>];

type ServiceAction = 'start' | 'stop' | 'reboot';

interface FileItem {
  value: object;
  status: 'writeable' | 'readonly' | 'not found';
}
