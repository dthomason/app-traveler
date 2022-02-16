import axios from 'axios';
import Config from 'react-native-config';

export const unsplash = axios;

export const configureUnsplashApi = (): void => {
  unsplash.defaults.baseURL = 'http://api.unsplash.com';

  unsplash.defaults.headers.common['Authorization'] =
    Config.UNSPLASH_ACCESS_KEY;

  unsplash.interceptors.response.use(function axiosInterceptorResponseSuccess(
    response,
  ) {
    return response;
  });
};
