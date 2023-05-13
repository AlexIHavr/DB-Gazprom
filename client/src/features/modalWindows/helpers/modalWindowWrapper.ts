import ClientError from 'shared/errors/ClientError';

import usePreloaderStore from '../../preloader/preloader.store';
import useModalWindowsStore from '../modalWindows.store';

export const modalWindowWrapper = async <ReturnType>(
  successMessage: string,
  func: () => ReturnType,
  settings?: { loading: boolean },
) => {
  const setIsLoading = usePreloaderStore.getState().setIsLoading;
  const addModalWindow = useModalWindowsStore.getState().addModalWindow;

  try {
    if (settings?.loading) setIsLoading(true);

    const result = await func();

    addModalWindow({ type: 'success', message: successMessage });

    return result;
  } catch (err) {
    if (err instanceof ClientError) addModalWindow({ type: 'error', message: err.message });
    throw err;
  } finally {
    if (settings?.loading) setIsLoading(false);
  }
};
