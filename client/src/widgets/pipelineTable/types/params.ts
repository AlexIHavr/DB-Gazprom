import { SORT_TYPES } from '../consts/searchSettings';

import {
  ExcelRow,
  ExcelValue,
  PipelineColumnProperties,
  PipelineProperties,
  PipelineRows,
  PipelineTable,
  PipelineTables,
  SearchCompareTypesValues,
} from './pipelineTable';

//helpers
export type GetUniqueRowsValuesParams = { rows: PipelineRows; index: number; maxCount?: number };
export type GetSortedRowsParams = { rows: PipelineRows; index: number; sortType: SORT_TYPES };
export type IsRangeComparedCellValueParams = { cellValue: ExcelValue; fromValue: string; toValue: string };
export type GetPipelineTableParams = PipelineProperties & { pipelineTables: PipelineTables };

export type IsSearchComparedCellValueParams = {
  cellValue: ExcelValue;
  searchValue: string;
  searchCompareTypes: SearchCompareTypesValues;
};

export type GetAddedColumnTableParams = {
  pipelineTable: PipelineTable;
  name: string;
  index: number;
  values?: ExcelRow;
};

//store
export type SetColumnsPropertiesParams = PipelineProperties & { properties: PipelineColumnProperties };
export type SetColumnPropertiesParams = SetColumnsPropertiesParams & { index: number };
export type SetPipelineTableRowsParams = PipelineProperties & { rows: PipelineRows };
export type AddColumnParams = PipelineProperties & { name: string; index: number; values?: ExcelRow };
