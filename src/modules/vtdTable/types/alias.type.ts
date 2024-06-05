import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';

export type ColumnAliasesKeys = keyof typeof COLUMN_ALIASES;
export type ColumnNames = Record<string, ColumnAliasesKeys>;
