import { TableType } from '../types/vtdTable';

export enum TABLE_TYPES {
  form = 'Форма',
  anomaly = 'Аномалии',
  character = 'Выявленные особенности',
}

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableType[];
