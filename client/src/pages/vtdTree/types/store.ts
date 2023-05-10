import { Vtds } from './vtds';
import { VtdTree } from './vtdTree';

export type UseVtdTreeStore = {
  vtdTree: VtdTree;
  vtds: Vtds;
  setVtds: () => Promise<void>;
  setVtdTree: (vtdTree: VtdTree) => void;
};
