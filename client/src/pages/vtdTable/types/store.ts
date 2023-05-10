import { CreateReportParams, GetVtdTableParams } from './params';
import { VtdTableResponse } from './vtdTable';

export type UseVtdTableStore = {
  createReport: ({ vtdId, files }: CreateReportParams) => Promise<void>;
  getVtdTable: ({ vtdId, type }: GetVtdTableParams) => Promise<VtdTableResponse>;
};
