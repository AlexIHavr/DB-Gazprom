import { SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES, SORT_TYPES, TABLE_TYPES, VTD_TREE_LEVELS } from './constants';

export type ExcelValue = string | number | null;
export type ExcelRow = ExcelValue[];
export type ExcelRows = ExcelRow[];

export type PipelineCell = {
  value: ExcelValue;
};
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
export type PipelineColumns = PipelineColumn[];
export type PipelineColumnPartial = Partial<PipelineColumn>;

export type TableType = keyof typeof TABLE_TYPES;

export type PipelineTable = {
  columns: PipelineColumns;
  rows: PipelineRows;
};
export type PipelineTablePartial = Partial<PipelineTable>;

export type PipelineData = Partial<Record<TableType, PipelineTable | null>>;

export type VtdData = {
  id: string;
  type: string;
  pipeline: string;
  section: string;
  year: string;
  pipelineData: PipelineData;
  createdAt: Date;
  updatedAt: Date;
};

export type Vtds = VtdData[];

export type GetVtdsResponse = Omit<VtdData, 'pipelineData'>[];

export type GetPipelineTable = {
  vtdId: string;
  tableType: TableType;
  pipelineTable?: PipelineTable;
};

export type VtdTreeLevels = typeof VTD_TREE_LEVELS;
export type VtdTreeLevel = keyof VtdTreeLevels;

export type InitialState = {
  vtds: Vtds;
};

export type SearchCompareTypesValues = typeof SEARCH_COMPARE_TYPES_VALUES;

export type PipelineTableProps = {
  table: PipelineTable;
  vtdId: string;
  tableType: TableType;
};

export type PipelineTableColumnProps = PipelineTableProps & {
  column: PipelineColumn;
};

export type PipelineTableTypeProps = Omit<PipelineTableProps, 'table'>;

export type UniqueRowsValuesProps = {
  uniqueRowsValues: ExcelRow;
  checkedUniqueRowsValues: ExcelRow;
  setCheckedUniqueRowsValues: React.Dispatch<React.SetStateAction<ExcelRow>>;
};

export type PipelineColumnProps = Omit<PipelineTableColumnProps, 'table'>;

export type UniqueRowsProps = PipelineColumnProps & {
  filteredRows: PipelineRows;
  searchValue: string;
  fromValue: string;
  toValue: string;
  searchType: SEARCH_TYPES;
  searchCompareTypes: SearchCompareTypesValues;
};

export type ResponseErrorData = {
  message: string;
};
