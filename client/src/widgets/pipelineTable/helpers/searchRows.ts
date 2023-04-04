import { SEARCH_COMPARE_TYPES } from '../consts/searchSettings';
import { IsRangeComparedCellValueParams, IsSearchComparedCellValueParams } from '../types/params';

export const isSearchComparedCellValue = ({ cellValue, searchValue, searchCompareTypes }: IsSearchComparedCellValueParams) => {
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

export const isRangeComparedCellValue = ({ cellValue, fromValue, toValue }: IsRangeComparedCellValueParams) => {
  if (cellValue === null) return false;

  if (fromValue && toValue) return cellValue >= fromValue && cellValue <= toValue;
  if (fromValue) return cellValue >= fromValue;
  if (toValue) return cellValue <= toValue;

  return cellValue;
};
