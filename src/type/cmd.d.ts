declare interface CmdItem {
  id: string;
  title: string;
  subTitle: string;
  template: string;
  variables: StringObject;
}

declare interface StringObject {
  [key: string]: string;
}
