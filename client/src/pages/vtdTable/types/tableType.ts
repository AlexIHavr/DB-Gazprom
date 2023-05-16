import { TABLE_TYPES, TABLE_TYPES_VALUES } from '../consts/tableTypes';

export type TableType = keyof typeof TABLE_TYPES;
export type TableTypes = TableType[];
export type TableTypesEntries = [TableType, typeof TABLE_TYPES_VALUES[0]][];
