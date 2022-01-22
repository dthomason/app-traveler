import axios, { AxiosError } from 'axios';

export const configureAxios = () => {
  // axios.defaults.headers.common['Authorization'] = `Client-ID ${accessKey}`;
  axios.defaults.headers.common['Authorization'] = 'Client-ID';
};

export const getErrorStatus = (err: AxiosError): ParsedAxiosError => {
  const { status, error } = parsedAxiosError(err);

  switch (status) {
    case 400:
      return { status, error: `Bad Request: ${error}` };
    case 401:
      return { status, error: `Unauthorized: ${error}` };
    case 404:
      return { status, error: `Not Found: ${error}` };
    case 500:
      return { status, error: `Internal Server Error: ${error}` };
    default:
      return { status, error };
  }
};

export const isAxiosError = <T = unknown>(
  error: unknown,
): error is AxiosError<T> =>
  error instanceof Error && !!(error as AxiosError).isAxiosError;

export interface ParsedAxiosError {
  status: number;
  error: string;
}

export const parsedAxiosError = (error: AxiosError): ParsedAxiosError => {
  return {
    status: error.response?.status ?? 0,
    error: error.response?.data ?? '',
  };
};

export const consoleAxiosError = (error: AxiosError): void => {
  const parsed = parsedAxiosError(error);

  console.error(`StatusCode: ${parsed.status} -- Error: ${parsed.error}`);
};
