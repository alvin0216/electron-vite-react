declare interface StoreState {
  smbInfo: object;
  hypothesis: object;
  configJson: any;
  betaConfigJson: any;
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
