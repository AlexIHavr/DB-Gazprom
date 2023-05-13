import axios, { AxiosInstance } from 'axios';
import { useModalWindowsStore, usePreloaderStore } from 'features';
import { ServerError } from 'shared/types/errors';

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
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data;

        let message: string;

        const errorResponse = errorData.errorResponse;
        if (errorResponse) {
          message = typeof errorResponse === 'string' ? errorResponse : errorResponse.message.join('\n');
        } else {
          message = errorData.message;
        }

        addModalWindow({ type: 'error', message });
      } else {
        addModalWindow({ type: 'error', message: err.message });
      }

      if (usePreloaderStore.getState().isLoading) usePreloaderStore.setState({ isLoading: false });
      throw err;
    },
  );
};
