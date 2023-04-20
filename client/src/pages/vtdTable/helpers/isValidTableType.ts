import { TABLE_TYPES_KEYS } from '../consts/tableTypes';
import { TableType } from '../types/vtdTable';

export const isValidTableType = (type?: string): type is TableType => TABLE_TYPES_KEYS.includes(type as TableType);
