import { VTD_TREE_LEVELS } from '../consts/vtdTreeLevels';

export type VtdTree = {
  header: string;
  children?: VtdTree;
  id?: string;
}[];

export type VtdTreeLevels = typeof VTD_TREE_LEVELS;
export type VtdTreeLevel = keyof VtdTreeLevels;
