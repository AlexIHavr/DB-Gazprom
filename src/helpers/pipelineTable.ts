import { SORT_TYPES } from '../redux/vtdTree/constants';
import { ExcelRows } from '../redux/vtdTree/types';

type GetSortedRowsParams = { sortType: SORT_TYPES; columnIndex: number; rows: ExcelRows };

export const getSortedRows = ({ sortType, columnIndex, rows }: GetSortedRowsParams) => {
  if (sortType === null) return rows;

  return rows
    .filter((row) => row[columnIndex] !== undefined)
    .sort((nextRow, row) => {
      let rowValue = row[columnIndex]!;
      let nextRowValue = nextRow[columnIndex]!;

      if (typeof rowValue === 'string') rowValue = rowValue.toLowerCase();
      if (typeof nextRowValue === 'string') nextRowValue = nextRowValue.toLowerCase();

      //sort number's string with number, e.g. tube number
      if (typeof rowValue === 'number' && typeof nextRowValue === 'string') {
        nextRowValue = isNaN(parseFloat(nextRowValue)) ? nextRowValue : parseFloat(nextRowValue);
      } else if (typeof nextRowValue === 'number' && typeof rowValue === 'string') {
        rowValue = isNaN(parseFloat(rowValue)) ? rowValue : parseFloat(rowValue);
      }

      switch (sortType) {
        case SORT_TYPES.desc:
          return rowValue >= nextRowValue ? 1 : -1;
        case SORT_TYPES.asc:
          return rowValue <= nextRowValue ? 1 : -1;
        default:
          return 0;
      }
    })
    .concat(rows.filter((row) => row[columnIndex] === undefined));
};
