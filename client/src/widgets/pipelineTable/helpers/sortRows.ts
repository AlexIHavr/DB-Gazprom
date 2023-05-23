import { ExcelValue } from 'shared/types/excel';

import { SORT_TYPES } from '../consts/searchSettings';
import { GetSortedRowsParams } from '../types/params';
import { PipelineRows } from '../types/pipelineTable';

const getParsedFloat = (cellValue: Exclude<ExcelValue, null>) => {
  if (typeof cellValue === 'string') {
    cellValue = cellValue.toLowerCase();
    cellValue = cellValue.includes(' ') || isNaN(parseFloat(cellValue)) ? cellValue : parseFloat(cellValue);
  }

  return cellValue;
};

export const getDefaultSortedRows = (rows: PipelineRows) => {
  return [...rows].sort((nextRow, row) => {
    return Number(nextRow.cells[0].value) - Number(row.cells[0].value);
  });
};

export const getSortedRows = ({ sortType, index, rows }: GetSortedRowsParams) => {
  if (sortType === SORT_TYPES.none) return rows;

  return rows
    .filter(({ cells }) => cells[index].value !== null)
    .sort((nextRow, row) => {
      let cellValue = row.cells[index].value!;
      let nextCellValue = nextRow.cells[index].value!;

      cellValue = getParsedFloat(cellValue);
      nextCellValue = getParsedFloat(nextCellValue);

      switch (sortType) {
        case SORT_TYPES.desc:
          return cellValue >= nextCellValue ? 1 : -1;
        case SORT_TYPES.asc:
          return cellValue <= nextCellValue ? 1 : -1;
        default:
          return 0;
      }
    })
    .concat(rows.filter(({ cells }) => cells[index].value === null));
};
