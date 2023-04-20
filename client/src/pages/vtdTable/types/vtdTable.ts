import { ExcelValue } from 'shared/types/excel';
import { TimestampsField } from 'shared/types/server';

import { TABLE_TYPES } from '../consts/tableTypes';

export type TableType = keyof typeof TABLE_TYPES;
export type VtdRow = Record<string, ExcelValue>;
export type VtdTable = VtdRow[];
export type VtdTableResponse = ({ vtdId?: string } & TimestampsField & VtdRow)[];
