import { SEARCH_COMPARE_TYPES, SORT_TYPES } from 'redux/vtds/constants';
import { ExcelRow, ExcelValue, PipelineRows } from 'redux/vtds/types';

export const getDefaultSortedRows = (rows: PipelineRows) => {
  return [...rows].sort((nextRow, row) => {
    return Number(nextRow.values[0].value) - Number(row.values[0].value);
  });
};

type GetSortedRowsParams = { sortType: SORT_TYPES; columnIndex: number; rows: PipelineRows };

export const getSortedRows = ({ sortType, columnIndex, rows }: GetSortedRowsParams) => {
  if (sortType === null) return rows;

  return rows
    .filter(({ values }) => values[columnIndex].value !== null)
    .sort((nextRow, row) => {
      let cellValue = row.values[columnIndex].value!;
      let nextCellValue = nextRow.values[columnIndex].value!;

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
    .concat(rows.filter(({ values }) => values[columnIndex].value === null));
};

type getUniqueRowsValuesParams = { rows: PipelineRows; columnIndex: number; maxCount?: number };

export const getUniqueRowsValues = ({ rows, columnIndex, maxCount }: getUniqueRowsValuesParams) => {
  const uniqueRowsValues: ExcelRow = [];

  for (const row of rows) {
    if (maxCount && maxCount <= uniqueRowsValues.length) break;

    const cellValue = row.values[columnIndex].value;
    if (!uniqueRowsValues.includes(cellValue)) uniqueRowsValues.push(cellValue);
  }

  if (rows.at(-1)?.values[columnIndex].value === null) {
    if (uniqueRowsValues.at(-1) === null) uniqueRowsValues.pop();
    uniqueRowsValues.unshift(null);
  }

  return uniqueRowsValues;
};

type isSearchComparedCellValueParams = {
  cellValue: ExcelValue;
  searchValue: string;
  searchCompareTypes: SEARCH_COMPARE_TYPES[];
};

export const isSearchComparedCellValue = ({ cellValue, searchValue, searchCompareTypes }: isSearchComparedCellValueParams) => {
  if (cellValue === null) return false;

  const stringValue = String(cellValue);
  const isWithRegistry = searchCompareTypes.includes(SEARCH_COMPARE_TYPES.matchCase);

  if (searchCompareTypes.includes(SEARCH_COMPARE_TYPES.matchWholeWord)) {
    if (isWithRegistry) return stringValue === searchValue;

    return stringValue.toLowerCase() === searchValue.toLowerCase();
  }

  if (isWithRegistry) return stringValue.includes(searchValue);

  return stringValue.toLowerCase().includes(searchValue.toLowerCase());
};

type isRangeComparedCellValueParams = {
  cellValue: ExcelValue;
  fromValue: string;
  toValue: string;
};

export const isRangeComparedCellValue = ({ cellValue, fromValue, toValue }: isRangeComparedCellValueParams) => {
  if (cellValue === null) return false;

  if (fromValue && toValue) return cellValue >= fromValue && cellValue <= toValue;
  if (fromValue) return cellValue >= fromValue;
  if (toValue) return cellValue <= toValue;

  return cellValue;
};
