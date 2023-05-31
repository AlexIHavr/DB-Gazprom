import { Vtd } from '../../vtdTree/types/vtds';
import { VtdTree } from '../../vtdTree/types/vtdTree';
import { GetVtdTreeChildrenParams } from '../types/params';

export const getStartKm = (vtd: Vtd) => {
  return vtd.section.split('-')[0];
};

export const getVtdIdBySelectValues = (vtdTree: VtdTree, selectValues: string[], level: number = 0): string | undefined => {
  const nextVtd = vtdTree.find(({ header }) => header === selectValues[level]);

  if (!nextVtd) return;

  if (!nextVtd.children) return nextVtd.id;
  return getVtdIdBySelectValues(nextVtd.children, selectValues, level + 1);
};

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

export const getNoExpFileName = (file: File) => {
  return file.name.split('.')[0];
};
