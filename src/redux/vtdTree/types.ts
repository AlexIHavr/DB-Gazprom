import { SEARCH_TYPES, SORT_TYPES } from './constants';

export type ExcelValue = string | number | undefined;
export type ExcelRow = ExcelValue[];
export type ExcelRows = ExcelRow[];

export type ExtendedFilter = { visible: boolean; type: SEARCH_TYPES };

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

export type PipelineTable = {
  columns: PipelineColumn[];
  rows: ExcelRows;
  sortedRows: ExcelRows;
};

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
