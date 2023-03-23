import { SEARCH_COMPARE_TYPES } from 'redux/vtds/constants';
import { ExcelValue, SearchCompareTypesValues } from 'redux/vtds/types';

type isSearchComparedCellValueParams = {
  cellValue: ExcelValue;
  searchValue: string;
  searchCompareTypes: SearchCompareTypesValues;
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
