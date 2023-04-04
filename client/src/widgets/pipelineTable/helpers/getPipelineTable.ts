import { GetPipelineTableParams } from '../types/params';

export const getPipelineTable = ({ pipelineTables, vtdId, type }: GetPipelineTableParams) =>
  pipelineTables.find((pipelineTable) => pipelineTable.vtdId === vtdId && pipelineTable.type === type);
