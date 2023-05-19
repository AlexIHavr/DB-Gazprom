import { ExcelRow, ExcelRows, ExcelValue } from 'shared/types/excel';
import { v4 } from 'uuid';

import { SORT_TYPES } from '../consts/searchSettings';
import { PipelineCell, PipelineColumn, PipelineRow, ExtendedFilter, PipelineData } from '../types/pipelineTable';

import { COLUMN_WIDTH } from './../consts/tableSettings';

export const getDefaultCell = (value: ExcelValue): PipelineCell => ({ value });

export const getDefaultExtendedFilter = (): ExtendedFilter => ({
  visible: false,
  checkedUniqueRowsValues: [],
});

export const getDefaultRow = (row: ExcelRow): PipelineRow => ({
  id: v4(),
  hidden: false,
  cells: row.map((value) => getDefaultCell(value)),
});

export const getDefaultColumn = (value: ExcelValue, index: number): PipelineColumn => ({
  id: v4(),
  index,
  value,
  hidden: false,
  width: COLUMN_WIDTH,
  minWidth: COLUMN_WIDTH,
  sortType: SORT_TYPES.none,
  extendedFilter: getDefaultExtendedFilter(),
});

export const getDefaultPipelineData = (excelRows: ExcelRows): PipelineData => ({
  columns: excelRows.length ? excelRows[0].map((value, index) => getDefaultColumn(value, index)) : [],
  rows: excelRows.length ? excelRows.slice(1).map((row) => getDefaultRow(row)) : [],
});
