import { create } from 'zustand';

import { UseVtdTreeStore } from './types/store';

const useVtdTreeStore = create<UseVtdTreeStore>()((set) => ({
  vtdTree: [],
  setVtdTree: (vtdTree) => set({ vtdTree }),
}));

export default useVtdTreeStore;
