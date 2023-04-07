import { LoadPipelineTableParams } from './params';
import { PipelineTable } from './pipelineTable';
import { Vtds } from './vtds';

export type UseVtdTableStore = {
  vtds: Vtds;
  setVtds: () => Promise<void>;
  loadPipelineTable: ({ vtdId, type, file }: LoadPipelineTableParams) => Promise<PipelineTable | undefined>;
};
