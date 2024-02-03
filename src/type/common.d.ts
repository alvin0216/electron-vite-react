declare interface SNItem {
  id: React.Key;
  sn: string;
  desc?: string;
}

declare interface MtmItem {
  id: React.Key;
  mtm: string;
  desc?: string;
}

declare type SMBCacheItem = SNItem | MtmItem;
