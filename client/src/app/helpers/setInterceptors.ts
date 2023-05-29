import { AxiosInstance } from 'axios';
import { usePreloaderStore } from 'features';

import { ServerError } from '../types/serverError';

import { showServerError } from './showServerError';

export const setInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    if (!usePreloaderStore.getState().isLoading) usePreloaderStore.setState({ isLoading: true });
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      if (usePreloaderStore.getState().isLoading) usePreloaderStore.setState({ isLoading: false });
      return config;
    },
    (err: ServerError) => {
      showServerError(err);

      if (usePreloaderStore.getState().isLoading) usePreloaderStore.setState({ isLoading: false });
      throw err;
    },
  );
};
