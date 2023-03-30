import { FC, memo, useMemo, useState } from 'react';
import { SEARCH_TYPES, SORT_TYPES } from 'redux/vtds/constants';
import { ExcelRow, UniqueRowsProps } from 'redux/vtds/types';

import SelectAllButton from '../../ui/selectAllButton/selectAllButton.component';
import AddToFilterButton from '../../ui/addToFilterButton/addToFilterButton.component';
import ApplyExtendedFilterButton from '../../ui/applyExtendedFilterButton/applyExtendedFilterButton.component';
import UniqueRowsValues from '../uniqueRowsValues/uniqueRowsValues.component';
import { getSortedRows } from '../../helpers/sortRows';
import { isRangeComparedCellValue, isSearchComparedCellValue } from '../../helpers/searchRows';
import { getUniqueRowsValues } from '../../helpers/getUniqueRowsValue';
import { MAX_COUNT_UNIQUE_ROWS } from '../../consts/tableSettings';

import './uniqueRowsValuesWrapper.styles.scss';

const UniqueRowsValuesWrapper: FC<UniqueRowsProps> = ({
  vtdId,
  tableType,
  filteredRows,
  column,
  searchValue,
  fromValue,
  toValue,
  searchType,
  searchCompareTypes,
}) => {
  const [checkedUniqueRowsValues, setCheckedUniqueRowsValues] = useState<ExcelRow>([]);
  const [isAddToFilter, setIsAddToFilter] = useState(false);

  const inputValue = useMemo(() => searchValue || fromValue || toValue, [fromValue, searchValue, toValue]);

  const filteredRowsBySearch = useMemo(() => {
    if (searchType === SEARCH_TYPES.search && searchValue) {
      return filteredRows.map((row) =>
        !row.hidden && !isSearchComparedCellValue({ cellValue: row.cells[column.index].value, searchValue, searchCompareTypes })
          ? { ...row, hidden: true }
          : row,
      );
    }

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue)) {
      return filteredRows.map((row) =>
        !row.hidden && !isRangeComparedCellValue({ cellValue: row.cells[column.index].value, fromValue, toValue })
          ? { ...row, hidden: true }
          : row,
      );
    }

    return filteredRows;
  }, [filteredRows, searchType, searchValue, column.index, searchCompareTypes, fromValue, toValue]);

  const visibleRows = useMemo(() => filteredRowsBySearch.filter(({ hidden }) => !hidden), [filteredRowsBySearch]);

  const uniqueRowsValues = useMemo(
    () =>
      getUniqueRowsValues({
        rows: getSortedRows({
          rows: visibleRows,
          columnIndex: column.index,
          sortType: SORT_TYPES.asc,
        }),
        columnIndex: column.index,
        maxCount: MAX_COUNT_UNIQUE_ROWS,
      }),
    [column.index, visibleRows],
  );

  if (!visibleRows.length) return <div className="noResults">Результаты не найдены</div>;

  return (
    <div className="uniqueRowsValuesWrapper">
      {uniqueRowsValues.length >= MAX_COUNT_UNIQUE_ROWS && (
        <div className="maxCountUniqueRowsValues">Показаны {MAX_COUNT_UNIQUE_ROWS} уникальных элементов</div>
      )}
      <SelectAllButton
        uniqueRowsValues={uniqueRowsValues}
        checkedUniqueRowsValues={checkedUniqueRowsValues}
        setCheckedUniqueRowsValues={setCheckedUniqueRowsValues}
      />
      {inputValue && <AddToFilterButton isAddToFilter={isAddToFilter} setIsAddToFilter={setIsAddToFilter} />}
      <UniqueRowsValues
        uniqueRowsValues={uniqueRowsValues}
        checkedUniqueRowsValues={checkedUniqueRowsValues}
        columnCheckedUniqueRowsValues={column.extendedFilter.checkedUniqueRowsValues}
        setCheckedUniqueRowsValues={setCheckedUniqueRowsValues}
        inputValue={inputValue}
      />
      <ApplyExtendedFilterButton
        vtdId={vtdId}
        tableType={tableType}
        column={column}
        isAddToFilter={isAddToFilter}
        filteredRows={isAddToFilter ? filteredRows : filteredRowsBySearch}
        uniqueRowsValues={uniqueRowsValues}
        checkedUniqueRowsValues={checkedUniqueRowsValues}
        searchValue={searchValue}
        fromValue={fromValue}
        toValue={toValue}
        searchType={searchType}
      />
    </div>
  );
};

export default memo(UniqueRowsValuesWrapper);
