import { create } from 'zustand';

import { UsePreloaderStore } from './preloader.types';

const usePreloaderStore = create<UsePreloaderStore>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default usePreloaderStore;
