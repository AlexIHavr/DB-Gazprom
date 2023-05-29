export enum VTD_TREE_LEVELS {
  type = 'type',
  pipeline = 'pipeline',
  section = 'section',
  year = 'year',
}

export const VTD_TREE_LEVEL_NAMES = {
  [VTD_TREE_LEVELS.type]: 'Тип газопровода',
  [VTD_TREE_LEVELS.pipeline]: 'Наименование газопровода',
  [VTD_TREE_LEVELS.section]: 'Участок газопровода',
  [VTD_TREE_LEVELS.year]: 'Год ВТД',
};

export const VTD_TREE_LEVELS_KEYS = Object.keys(VTD_TREE_LEVELS) as VTD_TREE_LEVELS[];
export const VTD_TREE_LEVEL_NAMES_VALUES = Object.values(VTD_TREE_LEVEL_NAMES);
