import { create } from 'zustand';

import vtdService from './services/vtdTree.service';
import { UseVtdTreeStore } from './types/store';

const useVtdTreeStore = create<UseVtdTreeStore>()((set) => ({
  vtds: [],
  vtdTree: [],

  setVtds: async () => {
    const vtds = await vtdService.getAll();
    set({ vtds });
  },

  setVtdTree: (vtdTree) => set({ vtdTree }),
}));

export default useVtdTreeStore;
