import { TableType } from './types';

/* eslint-disable no-unused-vars */
export enum VTD_TREE_LEVELS {
  type = 'type',
  pipeline = 'pipeline',
  section = 'section',
  year = 'year',
}

export enum REQUIRED_COLUMNS_NAMES {
  tubeNumberVtd = 'Номер трубы',
  tubeNumberRepairs = '№ трубы ВТД',
}

export enum SEARCH_TYPES {
  search = 'Поиск',
  range = 'Поиск в диапазоне',
}

export enum SEARCH_COMPARE_TYPES {
  matchCase = 'Учитывать регистр',
  matchWholeWord = 'Совпадение целого слова',
}

export enum SORT_TYPES {
  asc = 'Сортировка по возрастанию',
  desc = 'Сортировка по убыванию',
  none = 'Без сортировки',
}

export const TABLE_TYPES = {
  form: {
    type: 'form',
    name: 'Форма',
    requiredColumns: [REQUIRED_COLUMNS_NAMES.tubeNumberVtd],
  },
  repairs: {
    type: 'repairs',
    name: 'Ремонты',
    requiredColumns: [REQUIRED_COLUMNS_NAMES.tubeNumberRepairs],
  },
  inspections: {
    type: 'inspections',
    name: 'Обследования',
    requiredColumns: [],
  },
  statistics: {
    type: 'statistics',
    name: 'Статистика',
    requiredColumns: [],
  },
};

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableType[];
export const SEARCH_TYPES_VALUES = Object.values(SEARCH_TYPES);
export const SEARCH_COMPARE_TYPES_VALUES = Object.values(SEARCH_COMPARE_TYPES);
