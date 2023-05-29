import { Vtds } from '../types/vtds';
import { VTD_TREE_LEVELS_KEYS } from '../consts/vtdTreeLevels';
import { VtdTree } from '../types/vtdTree';

export const getVtdTree = (vtds: Vtds, levelIndex = 0): VtdTree => {
  const level = VTD_TREE_LEVELS_KEYS[levelIndex];

  return vtds
    .reduce<string[]>((prev, vtd) => {
      if (!prev.includes(vtd[level])) prev.push(vtd[level]);
      return prev;
    }, [])
    .map((header) => {
      const filteredVtds = vtds.filter((vtd) => vtd[level] === header);

      if (levelIndex === VTD_TREE_LEVELS_KEYS.length - 1) return { id: filteredVtds[0].id, header: filteredVtds[0][level] };

      return { header, children: getVtdTree(filteredVtds, levelIndex + 1) };
    });
};
