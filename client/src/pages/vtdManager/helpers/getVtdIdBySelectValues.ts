import { VtdTree } from '../../vtdTree/types/vtdTree';

export const getVtdIdBySelectValues = (vtdTree: VtdTree, selectValues: string[], level: number = 0): string | undefined => {
  const nextVtd = vtdTree.find(({ header }) => header === selectValues[level]);

  if (!nextVtd) return;

  if (!nextVtd.children) return nextVtd.id;
  return getVtdIdBySelectValues(nextVtd.children, selectValues, level + 1);
};
