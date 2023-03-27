import { Vtds, PipelineTableTypeProps, TableType } from 'redux/vtds/types';

type LoadPipelineTableParams = { vtdId: string; file: File; tableType: TableType };

export type UseVtdTableStore = {
  vtds: Vtds;
  setVtds: () => void;
  setPipelineTable: ({ tableType, vtdId }: PipelineTableTypeProps) => void;
  loadPipelineTable: ({ vtdId, file, tableType }: LoadPipelineTableParams) => void;
};
