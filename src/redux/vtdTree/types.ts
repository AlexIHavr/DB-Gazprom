import { SORT_TYPES } from './constants';

export type ExcelValue = string | number | undefined;
export type ExcelRow = ExcelValue[];
export type ExcelRows = ExcelRow[];

export type PipelineColumn = {
  id: string;
  value: ExcelValue;
  hidden: boolean;
  width: number;
  minWidth: number;
};

export type SortedColumn = (PipelineColumn & { sortType: SORT_TYPES; columnIndex: number }) | null;

export type PipelineTable = {
  sortedColumn: SortedColumn;
  columns: PipelineColumn[];
  rows: ExcelRows;
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
