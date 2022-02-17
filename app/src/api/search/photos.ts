import { AxiosRequestConfig } from 'axios';

import { searchPhotoResult, searchPhotosResponse } from './responses';

interface CreateConfig extends AxiosRequestConfig {
  method: 'GET';
  url: string;
}

export type SearchPhotosResponse = typeof searchPhotosResponse;
export type SearchPhotoResult = typeof searchPhotoResult;

export const photos = (query: string, page: number): CreateConfig => {
  return {
    method: 'GET',
    url: `/search/photos?page=${page}&query=${query}&count=1`,
  } as const;
};
