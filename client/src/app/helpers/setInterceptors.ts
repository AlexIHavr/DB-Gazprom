import { AxiosInstance } from 'axios';
import { setIsLoading } from 'redux/app/reducer';
import { store } from 'redux/store';

export const setInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    if (!store.getState().app.isLoading) store.dispatch(setIsLoading(true));
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      if (store.getState().app.isLoading) store.dispatch(setIsLoading(false));
      return config;
    },
    (err) => {
      if (store.getState().app.isLoading) store.dispatch(setIsLoading(false));
      throw err;
    },
  );
};
