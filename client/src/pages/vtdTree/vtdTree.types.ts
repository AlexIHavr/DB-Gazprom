export type VtdTree = {
  header: string;
  children?: VtdTree;
  id?: string;
}[];

export type UseVtdTreeStore = {
  vtdTree: VtdTree;
  setVtdTree: (vtdTree: VtdTree) => void;
};
