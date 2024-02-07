import { createContext } from 'react';
import { resourcePath } from '@constants/resource';
import { useLocalStorageState, useRequest } from 'ahooks';
import axios from 'axios';

export function useInitialCloudConfig() {
  const [url, setUrl] = useLocalStorageState('downloadUrl');

  const { data, error, loading } = useRequest(
    () =>
      axios.get(`${resourcePath.cloudConfig}?v=${Date.now()}`).then((res) => {
        const cloudConfig = res.data as CloudConfig;
        setUrl(cloudConfig.downloadUrl);
        return cloudConfig;
      }),

    {
      // manual: true,
      // 1 day
      pollingInterval: 1000 * 60 * 60 * 24,
      // pollingErrorRetryCount: 3,
    }
  );

  const lastestVersion = data?.version;
  const downloadUrl = data?.downloadUrl || url;
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
