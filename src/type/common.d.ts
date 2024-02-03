declare interface SNItem {
  id: React.Key;
  sn: string;
  desc: string;
  index: number;
}

declare interface MtmItem {
  id: React.Key;
  mtm: string;
  desc: string;
  index: number;
}

declare type SMBCacheItem = SNItem | MtmItem;
