import axios, { AxiosInstance } from 'axios';
import { ServerError } from 'shared/types/errors';

import { useModalWindowsStore, usePreloaderStore } from '../../entities';

export const setInterceptors = (api: AxiosInstance) => {
  const addModalWindow = useModalWindowsStore.getState().addModalWindow;

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
      if (axios.isAxiosError(err) && err.response) {
        addModalWindow({ type: 'error', message: err.response.data.message });
      } else {
        addModalWindow({ type: 'error', message: err.message });
      }

      if (usePreloaderStore.getState().isLoading) usePreloaderStore.setState({ isLoading: false });
      throw err;
    },
  );
};
