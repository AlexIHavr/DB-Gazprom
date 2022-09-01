import { SORT_TYPES } from '../../components/commons/pipelineTable/tableHead/sortFilter/constants';

export type ExcelValue = string | number | undefined;
export type ExcelRow = ExcelValue[];
export type ExcelRows = ExcelRow[];

export type ExtendedFilter = {
  visible: boolean;
  checkedUniqueRowsValues: ExcelRow;
  searchValue?: string;
  fromValue?: string;
  toValue?: string;
};

export type PipelineColumn = {
  id: string;
  index: number;
  value: ExcelValue;
  hidden: boolean;
  width: number;
  minWidth: number;
  sortType: SORT_TYPES | null;
  extendedFilter: ExtendedFilter;
};

export type PipelineColumnProperties = Partial<PipelineColumn>;

export type PipelineTable = {
  columns: PipelineColumn[];
  rows: ExcelRows;
  sortedRows: ExcelRows;
  filteredRows: ExcelRows;
};

export type PipelineTableProperties = Partial<PipelineTable>;

export type PipelineData = {
  form?: PipelineTable;
  repairs?: PipelineTable;
  inspections?: PipelineTable;
  statistics?: PipelineTable;
};

export type PipelineDataTables = keyof PipelineData;

export type VtdTree = {
  id: string;
  type: string;
  pipeline: string;
  section: string;
  umg: string;
  year: string;
  pipelineData: PipelineData;
}[];

export type InitialState = {
  vtdTree: VtdTree;
};

export type SetPipelinesDataParams = {
  vtdId: string;
  data: PipelineData;
};
