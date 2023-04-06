import { create } from 'zustand';

import { UsePreloaderStore } from './types/store';

const usePreloaderStore = create<UsePreloaderStore>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default usePreloaderStore;
