import { create } from 'zustand';

import { UseVtdTreeStore } from './vtdTree.types';

const useVtdTreeStore = create<UseVtdTreeStore>()((set) => ({
  vtdTree: [],
  setVtdTree: (vtdTree) => set({ vtdTree }),
}));

export default useVtdTreeStore;
