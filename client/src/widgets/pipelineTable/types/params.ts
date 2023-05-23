import { ExcelRows, ExcelValue } from 'shared/types/excel';

import { SORT_TYPES } from '../consts/searchSettings';

import {
  PipelineColumnProperties,
  PipelineProperties,
  PipelineRows,
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

//store
export type AddPipelineTableParams = PipelineProperties & { excelRows: ExcelRows };
export type SetColumnsPropertiesParams = PipelineProperties & { properties: PipelineColumnProperties };
export type SetColumnPropertiesParams = SetColumnsPropertiesParams & { index: number };
export type SetPipelineTableRowsParams = PipelineProperties & { rows: PipelineRows };
