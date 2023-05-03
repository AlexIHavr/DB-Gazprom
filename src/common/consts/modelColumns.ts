import { DataType } from 'sequelize-typescript';
import { UNSIGNED_SMALLINT_OPTIONS } from './modelColumnOptions';

export type WeldTypeColumn = string | null;
export const weldTypeColumn = {
  name: 'Тип сварного шва',
  options: { type: DataType.STRING, field: 'weldType' },
} as const;

export type TypeColumn = string;
export const typeColumn = {
  name: 'Тип',
  options: { type: DataType.STRING, allowNull: false, field: 'type' },
} as const;

export type AnomaliesCountColumn = number;
export const anomaliesCountColumn = {
  name: 'Аномалий',
  options: { ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false, field: 'anomaliesCount' },
} as const;

export type DangerCountColumn = string | null;
export const dangerCountColumn = {
  name: 'Опасность',
  options: { type: DataType.STRING, field: 'danger' },
} as const;
