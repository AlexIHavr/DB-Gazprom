import { TableTypes, TableTypesEntries } from '../types/tableType';

import { TABLE_TYPE_GROUPS } from './tableTypeGroups';

export const TABLE_TYPES = {
  form: { name: 'Форма ЛОиР', groupName: TABLE_TYPE_GROUPS.form },
  joining: { name: 'Стыковка труб', groupName: TABLE_TYPE_GROUPS.form },
  anomaly: { name: 'Аномалии', groupName: TABLE_TYPE_GROUPS.report },
  character: { name: 'Выявленные особенности', groupName: TABLE_TYPE_GROUPS.report },
  branch: { name: 'Отводы', groupName: TABLE_TYPE_GROUPS.report },
  weld: { name: 'Поперечные сварные швы', groupName: TABLE_TYPE_GROUPS.report },
  equipment: { name: 'Элементы обустройства', groupName: TABLE_TYPE_GROUPS.report },
  mark: { name: 'Реперы', groupName: TABLE_TYPE_GROUPS.report },
  tap: { name: 'Межкрановый участок', groupName: TABLE_TYPE_GROUPS.report },
  summary: { name: 'Сводка результатов', groupName: TABLE_TYPE_GROUPS.report },
} as const;

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableTypes;
export const TABLE_TYPES_VALUES = Object.values(TABLE_TYPES);
export const TABLE_TYPES_ENTRIES = Object.entries(TABLE_TYPES) as TableTypesEntries;
