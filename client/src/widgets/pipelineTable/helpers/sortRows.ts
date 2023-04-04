import { SORT_TYPES } from '../consts/searchSettings';
import { GetSortedRowsParams } from '../types/params';
import { PipelineRows } from '../types/pipelineTable';

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
    .concat(rows.filter(({ cells }) => cells[index].value === null));
};
