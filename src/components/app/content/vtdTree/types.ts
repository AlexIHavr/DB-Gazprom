import { VTD_TREE_LEVELS } from './constants';

export type VtdTreeLevels = keyof typeof VTD_TREE_LEVELS;

export type AdaptedVtdTree = {
  [VTD_TREE_LEVELS.type]: string;
  pipelines: {
    [VTD_TREE_LEVELS.pipeline]: string;
    sections: {
      [VTD_TREE_LEVELS.section]: string;
      umg: string;
      years: {
        id: string;
        [VTD_TREE_LEVELS.year]: string;
      }[];
    }[];
  }[];
}[];
