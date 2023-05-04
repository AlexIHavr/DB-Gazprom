import { COLUMN_ALIASES } from '../consts/modelColumnAliases';

export type ColumnAliasesKeys = keyof typeof COLUMN_ALIASES;
export type ColumnNames = Record<string, string>;
