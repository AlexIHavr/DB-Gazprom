import { GetPipelineTableDto } from '../dto/getPipelineTable.dto';

export type PipelineTable = GetPipelineTableDto & { [key: string]: unknown };
export type PipelineTables = PipelineTable[];
