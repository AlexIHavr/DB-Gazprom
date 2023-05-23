import {
  AddPipelineTableParams,
  SetColumnPropertiesParams,
  SetColumnsPropertiesParams,
  SetPipelineTableRowsParams,
} from './params';
import { PipelineTables } from './pipelineTable';

export type UsePipelineTableStore = {
  pipelineTables: PipelineTables;
  addPipelineTable: ({ vtdId, type, excelRows }: AddPipelineTableParams) => Promise<void>;
  setColumnProperties: ({ vtdId, type, index, properties }: SetColumnPropertiesParams) => void;
  setColumnsProperties: ({ vtdId, type, properties }: SetColumnsPropertiesParams) => void;
  setPipelineTableRows: ({ vtdId, type, rows }: SetPipelineTableRowsParams) => void;
};
