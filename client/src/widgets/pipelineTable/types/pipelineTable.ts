import { SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES, SORT_TYPES } from '../consts/searchSettings';

export type SearchCompareTypesValues = typeof SEARCH_COMPARE_TYPES_VALUES;

export type ExcelValue = string | number | null;

export type ExcelRow = ExcelValue[];
export type ExcelRows = ExcelRow[];

export type PipelineCell = { value: ExcelValue };
export type PipelineCells = PipelineCell[];

export type PipelineRow = {
  id: string;
  hidden: boolean;
  cells: PipelineCells;
};
export type PipelineRows = PipelineRow[];

export type ExtendedFilter = {
  visible: boolean;
  checkedUniqueRowsValues: ExcelRow;
  searchValue?: string;
  fromValue?: string;
  toValue?: string;
  searchType?: SEARCH_TYPES;
};

export type PipelineColumn = {
  id: string;
  index: number;
  value: ExcelValue;
  hidden: boolean;
  width: number;
  minWidth: number;
  sortType: SORT_TYPES;
  extendedFilter: ExtendedFilter;
};
export type PipelineColumnProperties = Partial<PipelineColumn>;
export type PipelineColumns = PipelineColumn[];

export type PipelineData = { columns: PipelineColumns; rows: PipelineRows };
export type PipelineProperties = { vtdId: string; type: string };

export type PipelineTable = PipelineProperties & PipelineData;
export type PipelineTables = PipelineTable[];
