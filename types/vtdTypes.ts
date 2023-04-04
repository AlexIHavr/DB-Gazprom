import { Model } from 'sequelize';

export type GetPipelineTableParams = {
  vtdId: string;
  type: string;
};

export type PipelineTable = GetPipelineTableParams & { [key: string]: unknown };
export type PipelineTables = PipelineTable[];

export type LoadPipelineTableRequest = {
  pipelineTable: PipelineTable;
};

export type VtdAttributes = {
  id: string;
  type: string;
  pipeline: string;
  section: string;
  year: string;
  pipelineTables?: PipelineTables;
};

export type VtdModel = Model<Required<VtdAttributes>, VtdAttributes> & Required<VtdAttributes>;
