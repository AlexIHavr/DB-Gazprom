import { v4 } from 'uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { UseModalWindowsStore } from './types/store';

const useModalWindowsStore = create<UseModalWindowsStore>()(
  immer((set) => ({
    modalWindows: [],

    addModalWindow: (modalWindow) => {
      set((state) => {
        state.modalWindows.push({ id: v4(), ...modalWindow });
      });
    },

    removeModalWindow: (id) => {
      set((state) => {
        state.modalWindows = state.modalWindows.filter((modalWindow) => modalWindow.id !== id);
      });
    },
  })),
);

export default useModalWindowsStore;
