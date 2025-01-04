import { SEARCH_COMPARE_TYPES } from '../consts/searchSettings';
import { IsRangeComparedCellValueParams, IsSearchComparedCellValueParams } from '../types/params';

import { getParsedFloat } from './sortRows';

export const isSearchComparedCellValue = ({
  cellValue,
  searchValue,
  searchCompareTypes,
}: IsSearchComparedCellValueParams): boolean => {
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

export const isRangeComparedCellValue = ({
  cellValue,
  fromValue,
  toValue,
}: IsRangeComparedCellValueParams): string | number | boolean => {
  if (cellValue === null) return false;

  const parsedCellValue = getParsedFloat(cellValue);
  const parsedFromValue = getParsedFloat(fromValue);
  const parsedToValue = getParsedFloat(toValue);

  if (fromValue && toValue) {
    return parsedCellValue >= parsedFromValue && parsedCellValue <= parsedToValue;
  }

  if (fromValue) {
    return parsedCellValue >= parsedFromValue;
  }

  if (toValue) {
    return parsedCellValue <= parsedToValue;
  }

  return cellValue;
};
