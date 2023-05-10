import { TableType, VtdTable } from './vtdTable';

export type GetVtdTableParams = { vtdId: string; type: TableType };
export type CreateAllParams = GetVtdTableParams & { vtdTable: VtdTable };
export type CreateReportParams = { vtdId: string; files: FileList };
