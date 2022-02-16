import { AxiosRequestConfig } from 'axios';

import { fetchPhotoResponse } from './responses';

interface Data {
  raw: string;
  width: number;
}

interface CreateConfig extends AxiosRequestConfig {
  method: 'GET';
  url: string;
}

export type FetchPhotoResponse = typeof fetchPhotoResponse;

export const photo = (data: Data): CreateConfig => {
  return {
    method: 'GET',
    url: `${data.raw}?w=${data.width}`,
  } as const;
};
