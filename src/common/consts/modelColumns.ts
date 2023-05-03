import { DataType } from 'sequelize-typescript';
import { UNSIGNED_SMALLINT_OPTIONS } from './modelColumnOptions';

export type WeldTypeColumn = string | null;
export const WELD_TYPE_COLUMN = {
  name: 'Тип сварного шва',
  options: { type: DataType.STRING, field: 'weldType' },
} as const;

export type TypeColumn = string;
export const TYPE_COLUMN = {
  name: 'Тип',
  options: { type: DataType.STRING, allowNull: false, field: 'type' },
} as const;

export type AnomaliesCountColumn = number;
export const ANOMALIES_COUNT_COLUMN = {
  name: 'Аномалий',
  options: { ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false, field: 'anomaliesCount' },
} as const;

export type DangerCountColumn = string | null;
export const DANGER_COUNT_COLUMN = {
  name: 'Опасность',
  options: { type: DataType.STRING, field: 'danger' },
} as const;
