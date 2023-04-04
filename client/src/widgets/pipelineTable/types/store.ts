import { AddColumnParams, SetColumnPropertiesParams, SetColumnsPropertiesParams, SetPipelineTableRowsParams } from './params';
import { PipelineProperties, PipelineTables } from './pipelineTable';

export type UsePipelineTableStore = {
  pipelineTables: PipelineTables;
  addPipelineTable: ({ vtdId, type }: PipelineProperties) => Promise<void>;
  setColumnProperties: ({ vtdId, type, index, properties }: SetColumnPropertiesParams) => void;
  setColumnsProperties: ({ vtdId, type, properties }: SetColumnsPropertiesParams) => void;
  setPipelineTableRows: ({ vtdId, type, rows }: SetPipelineTableRowsParams) => void;
  addColumn: ({ vtdId, type, name, index, values }: AddColumnParams) => void;
};
