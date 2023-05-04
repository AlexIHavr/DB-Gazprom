import { VtdTable } from 'src/common/models/VtdTable.model';
import { CreationAttributes } from 'src/common/types/utility';

export type VtdTableModel = typeof VtdTable<VtdTable>;
export type VtdTableRows = VtdTable[];
export type VtdTableDtoRow = CreationAttributes<VtdTable>;
