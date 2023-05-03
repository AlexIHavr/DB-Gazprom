import { TableType } from '../types/vtdTable';

export enum TABLE_TYPES {
  anomaly = 'Аномалии',
  character = 'Выявленные особенности',
  branch = 'Отводы',
  weld = 'Поперечные сварные швы',
}

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableType[];
