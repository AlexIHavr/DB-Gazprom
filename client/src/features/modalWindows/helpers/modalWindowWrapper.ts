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
    addModalWindow({ type: 'error', message: (err as Error).message });
  } finally {
    if (settings?.loading) setIsLoading(false);
  }
};
