import { SORT_TYPES } from '../../components/commons/pipelineTable/tableHead/sortFilter/constants';

import { VTD_TREE_LEVELS } from './constants';

export type ExcelValue = string | number | null;
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

export type TableType = keyof PipelineData;

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

export type VtdTreeLevels = keyof typeof VTD_TREE_LEVELS;

export type VtdTree = {
  [VTD_TREE_LEVELS.type]: string;
  pipelines: {
    [VTD_TREE_LEVELS.pipeline]: string;
    sections: {
      [VTD_TREE_LEVELS.section]: string;
      umg: string;
      years: {
        id: string;
        [VTD_TREE_LEVELS.year]: string;
      }[];
    }[];
  }[];
}[];

export type InitialState = {
  vtds: Vtds;
  vtdTree: VtdTree;
};

export type GetPipelineTable = {
  vtdId: string;
  pipelineTable: PipelineTable;
  tableType: TableType;
};
