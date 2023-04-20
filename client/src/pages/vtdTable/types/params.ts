import { TableType, VtdTable } from './vtdTable';

export type GetVtdTableParams = { vtdId: string; type: TableType };
export type LoadPipelineTableParams = GetVtdTableParams & { file: File };
export type CreateVtdTableParams = GetVtdTableParams & { vtdTable: VtdTable };
