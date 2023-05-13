import { VtdTree } from '../../vtdTree/types/vtdTree';
import { GetVtdTreeChildrenParams } from '../types/params';

export const getVtdTreeChildren = ({ vtdTree, selectValues, selectIndex, level = 0 }: GetVtdTreeChildrenParams): VtdTree => {
  if (!vtdTree.length) return [];
  if (level === selectIndex) return vtdTree;

  return getVtdTreeChildren({
    vtdTree: vtdTree.find(({ header }) => header === selectValues[level])?.children || [],
    selectValues,
    selectIndex,
    level: level + 1,
  });
};
