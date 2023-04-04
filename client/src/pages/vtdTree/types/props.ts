import { Dispatch, ReactNode, SetStateAction } from 'react';

import { VTD_TREE_LEVELS } from '../consts/vtdTreeLevels';

import { VtdTree, VtdTreeLevel, VtdTreeLevels } from './vtdTree';

export type VtdTreeRootProps = {
  children?: ReactNode;
  header: string;
  level: VtdTreeLevel;
  useH3?: boolean;
};

export type VtdTreeHeaderProps = {
  header: string;
  levelExpanded: VTD_TREE_LEVELS;
  useH3?: boolean;
};

export type VtdTreeDetailsProps = Omit<VtdTreeRootProps, 'useH3'> & {
  levelsExpanded: VtdTreeLevels;
  levelsHeight: VtdTreeLevels;
  setLevelsHeight: Dispatch<SetStateAction<VtdTreeLevels>>;
};

export type VtdTreeTableTypesProps = {
  id: string;
};

export type VtdTreeWrapperProps = {
  treeChildren: VtdTree;
  levelIndex?: number;
};
