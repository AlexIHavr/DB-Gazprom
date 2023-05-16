import { ExcelValue } from 'shared/types/excel';
import { TimestampsField } from 'shared/types/server';

export type VtdRow = Record<string, ExcelValue>;
export type VtdTable = VtdRow[];
export type VtdTableResponse = ({ vtdId?: string } & TimestampsField & VtdRow)[];
