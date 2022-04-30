import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** This tells rollbar to ignore error codes in this array */
    /** Copied from Mobius Repo so could probably be modified if necessary */
    expectErrors?: number[];
  }
}
