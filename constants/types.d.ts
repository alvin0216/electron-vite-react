declare namespace IPCPayload {
  export interface Tran {
    source: { name: string; path: string }[];
    target: { name: string; path: string }[];
    indentation: '2' | '4';
    sort: boolean;
  }
}
