import { TableType } from '../types/vtdTable';

export enum TABLE_TYPES {
  anomaly = 'Аномалии',
  character = 'Выявленные особенности',
  branch = 'Отводы',
  weld = 'Поперечные сварные швы',
  equipment = 'Элементы обустройства',
  mark = 'Реперы',
  tap = 'Межкрановый участок',
  summary = 'Сводка результатов',
}

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableType[];
