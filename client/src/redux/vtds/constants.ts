import { TableType } from './types';

/* eslint-disable no-unused-vars */
export enum VTD_TREE_LEVELS {
  type = 'type',
  pipeline = 'pipeline',
  section = 'section',
  year = 'year',
}

export enum TABLE_TYPES {
  form = 'form',
  repairs = 'repairs',
  inspections = 'inspections',
  statistics = 'statistics',
}

export const TABLE_TYPES_NAMES = {
  [TABLE_TYPES.form]: 'Форма',
  [TABLE_TYPES.repairs]: 'Ремонты',
  [TABLE_TYPES.inspections]: 'Обследования',
  [TABLE_TYPES.statistics]: 'Статистика',
};

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableType[];

export enum REQUIRED_COLUMNS_NAMES {
  typeNumberVtd = 'Номер трубы',
  typeNumberRepairs = '№ трубы ВТД',
}

export const REQUIRED_COLUMNS = {
  [TABLE_TYPES.form]: [REQUIRED_COLUMNS_NAMES.typeNumberVtd],
  [TABLE_TYPES.repairs]: [REQUIRED_COLUMNS_NAMES.typeNumberRepairs],
  [TABLE_TYPES.inspections]: [],
  [TABLE_TYPES.statistics]: [],
};
