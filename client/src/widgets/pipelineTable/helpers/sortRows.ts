import { SORT_TYPES } from 'redux/vtds/constants';
import { PipelineRows } from 'redux/vtds/types';

export const getDefaultSortedRows = (rows: PipelineRows) => {
  return [...rows].sort((nextRow, row) => {
    return Number(nextRow.cells[0].value) - Number(row.cells[0].value);
  });
};

type GetSortedRowsParams = { sortType: SORT_TYPES; columnIndex: number; rows: PipelineRows };

export const getSortedRows = ({ sortType, columnIndex, rows }: GetSortedRowsParams) => {
  if (sortType === SORT_TYPES.none) return rows;

  return rows
    .filter(({ cells }) => cells[columnIndex].value !== null)
    .sort((nextRow, row) => {
      let cellValue = row.cells[columnIndex].value!;
      let nextCellValue = nextRow.cells[columnIndex].value!;

      if (typeof cellValue === 'string') cellValue = cellValue.toLowerCase();
      if (typeof nextCellValue === 'string') nextCellValue = nextCellValue.toLowerCase();

      //sort number's string with number, e.g. tube number
      if (typeof cellValue === 'number' && typeof nextCellValue === 'string') {
        nextCellValue = isNaN(parseFloat(nextCellValue)) ? nextCellValue : parseFloat(nextCellValue);
      } else if (typeof nextCellValue === 'number' && typeof cellValue === 'string') {
        cellValue = isNaN(parseFloat(cellValue)) ? cellValue : parseFloat(cellValue);
      }

      switch (sortType) {
        case SORT_TYPES.desc:
          return cellValue >= nextCellValue ? 1 : -1;
        case SORT_TYPES.asc:
          return cellValue <= nextCellValue ? 1 : -1;
        default:
          return 0;
      }
    })
    .concat(rows.filter(({ cells }) => cells[columnIndex].value === null));
};
