import { Model } from 'sequelize';

export type TableType = 'form' | 'repairs' | 'inspections' | 'statistics';

export type GetPipelineTableParams = {
  id: string;
  tableType: TableType;
};

export type SetPipelineTableRequest = {
  id: string;
  pipelineTable: {};
  tableType: TableType;
};

export type VtdAttributes = {
  id: string;
  type: string;
  pipeline: string;
  section: string;
  umg: string;
  year: string;
  pipelineData?: Record<TableType, {}>;
};

export type VtdModel = Model<Required<VtdAttributes>, VtdAttributes> & Required<VtdAttributes>;
