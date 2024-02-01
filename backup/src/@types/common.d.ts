declare type ComputerType = "gaming" | "no-gaming";

declare interface UpdateRegParams {
  key: "computerType" | "country";
  computerType: ComputerType;
  countryCode: string;
}
