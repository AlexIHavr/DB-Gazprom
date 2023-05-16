import { TABLE_TYPES_KEYS } from '../consts/tableTypes';
import { TableType } from '../types/tableType';

export const isValidTableType = (type?: string): type is TableType => TABLE_TYPES_KEYS.includes(type as TableType);
