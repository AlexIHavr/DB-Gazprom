import { GetVtdTableParams, LoadPipelineTableParams } from './params';
import { Vtds } from './vtds';
import { VtdTableResponse } from './vtdTable';

export type UseVtdTableStore = {
  vtds: Vtds;
  setVtds: () => Promise<void>;
  createVtdTable: ({ vtdId, type, file }: LoadPipelineTableParams) => Promise<void>;
  getVtdTable: ({ vtdId, type }: GetVtdTableParams) => Promise<VtdTableResponse>;
};
