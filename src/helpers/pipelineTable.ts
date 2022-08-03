import { SEARCH_COMPARE_TYPES } from '../components/commons/pipelineTable/tableHead/extendedFilter/extendedFilterPanel/constants';
import { SORT_TYPES } from '../components/commons/pipelineTable/tableHead/sortFilter/constants';
import { ExcelRow, ExcelRows } from '../redux/vtdTree/types';

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

type getUniqueRowsValuesParams = { rows: ExcelRows; columnIndex: number; maxCount?: number };

export const getUniqueRowsValues = ({ rows, columnIndex, maxCount }: getUniqueRowsValuesParams) => {
  const uniqueRowsValues: ExcelRow = [];

  for (const row of rows) {
    if (maxCount && maxCount <= uniqueRowsValues.length) break;

    if (!uniqueRowsValues.includes(row[columnIndex])) {
      uniqueRowsValues.push(row[columnIndex]);
    }
  }

  return uniqueRowsValues;
};

type getSearchCompareRowsParams = {
  rows: ExcelRows;
  columnIndex: number;
  searchValue: string;
  searchCompareTypes: SEARCH_COMPARE_TYPES[];
};

export const getSearchCompareRows = ({ rows, columnIndex, searchValue, searchCompareTypes }: getSearchCompareRowsParams) => {
  return rows.filter((row) => {
    if (row[columnIndex] === undefined) return false;

    const rowValue = String(row[columnIndex]);
    const isWithRegistry = searchCompareTypes.includes(SEARCH_COMPARE_TYPES.withRegistry);

    if (searchCompareTypes.includes(SEARCH_COMPARE_TYPES.wholeWord)) {
      if (isWithRegistry) return rowValue === searchValue;

      return rowValue.toLowerCase() === searchValue.toLowerCase();
    }

    if (isWithRegistry) return rowValue.includes(searchValue);

    return rowValue.toLowerCase().includes(searchValue.toLowerCase());
  });
};

type getRangeCompareRowsParams = {
  rows: ExcelRows;
  columnIndex: number;
  fromValue: string;
  toValue: string;
};

export const getRangeCompareRows = ({ rows, columnIndex, fromValue, toValue }: getRangeCompareRowsParams) => {
  return rows.filter((row) => {
    const rowValue = row[columnIndex];

    if (rowValue === undefined) return false;

    if (fromValue && toValue) return rowValue >= fromValue && rowValue <= toValue;
    if (fromValue) return rowValue >= fromValue;
    if (toValue) return rowValue <= toValue;

    return rowValue;
  });
};
