import { SEARCH_TYPES } from '../../components/commons/pipelineTable/tableHead/extendedFilter/extendedFilterPanel/constants';
import { SORT_TYPES } from '../../components/commons/pipelineTable/tableHead/sortFilter/constants';

import { TABLE_TYPES, VTD_TREE_LEVELS } from './constants';

export type ExcelValue = string | number | null;
export type ExcelRow = ExcelValue[];
export type ExcelRows = ExcelRow[];

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
  sortType: SORT_TYPES | null;
  extendedFilter: ExtendedFilter;
};
export type PipelineColumns = PipelineColumn[];

export type PipelineColumnProperties = Partial<PipelineColumn>;

export type PipelineCell = {
  value: ExcelValue;
};

export type PipelineCells = PipelineCell[];

export type PipelineRow = {
  id: string;
  hidden: boolean;
  values: PipelineCells;
};
export type PipelineRows = PipelineRow[];

export type PipelineTable = {
  columns: PipelineColumns;
  rows: PipelineRows;
};

export type PipelineTableProperties = Partial<PipelineTable>;

export type TableType = keyof typeof TABLE_TYPES;

export type PipelineData = Partial<Record<TableType, PipelineTable | null>>;

export type VtdData = {
  id: string;
  type: string;
  pipeline: string;
  section: string;
  umg: string;
  year: string;
  pipelineData: PipelineData;
  createdAt: Date;
  updatedAt: Date;
};

export type Vtds = VtdData[];

export type GetVtdsResponse = Omit<VtdData, 'pipelineData'>[];

export type GetPipelineTable = {
  vtdId: string;
  pipelineTable?: PipelineTable;
  tableType: TableType;
};

export type InnerCellTables = Record<string, PipelineTable>;
export type InnerRowsTables = Record<number, InnerCellTables>;
export type InnerTables = Record<number, InnerRowsTables>;

export type VtdTreeLevels = keyof typeof VTD_TREE_LEVELS;

export type VtdYears = {
  id: string;
  [VTD_TREE_LEVELS.year]: string;
}[];

export type VtdTree = {
  [VTD_TREE_LEVELS.type]: string;
  pipelines: {
    [VTD_TREE_LEVELS.pipeline]: string;
    sections: {
      [VTD_TREE_LEVELS.section]: string;
      umg: string;
      years: VtdYears;
    }[];
  }[];
}[];

export type InitialState = {
  vtds: Vtds;
  vtdTree: VtdTree;
};
