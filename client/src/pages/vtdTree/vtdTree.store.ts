import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import vtdService from './services/vtdTree.service';
import { UseVtdTreeStore } from './types/store';

const useVtdTreeStore = create<UseVtdTreeStore>()(
  devtools((set) => ({
    vtds: [],
    vtdTree: [],

    setVtds: async (): Promise<void> => {
      const vtds = await vtdService.getAll();
      set({ vtds });
    },

    setVtdTree: (vtdTree): void => set({ vtdTree }),
  })),
);

export default useVtdTreeStore;
