import { createContext } from 'react';
import { resourcePath } from '@constants/resource';
import { useRequest } from 'ahooks';
import axios from 'axios';

export function useInitialCloudConfig() {
  const { data, error, loading } = useRequest(
    () => axios.get(`${resourcePath.cloudConfig}?v=${Date.now()}`) as Promise<{ data: CloudConfig }>,
    {
      // manual: true,
      // 2 hours
      // pollingInterval: 7200000,
      // pollingErrorRetryCount: 3,
    }
  );

  const lastestVersion = data?.data.version;
  const downloadUrl = data?.data.downloadUrl;
  const isLastest = !data || isLatestVersion(lastestVersion!);

  return { lastestVersion, downloadUrl, isLastest, loading };
}

export const CloudContext = createContext<{
  loading: boolean;
  isLastest: boolean;
  lastestVersion?: string;
  downloadUrl?: string;
}>(
  // @ts-ignore
  null
);

function convertToNumber(version: string) {
  return Number(version.replace(/\D/g, ''));
}

function isLatestVersion(version: string) {
  return convertToNumber(APP_VERSION) >= convertToNumber(version);
}
