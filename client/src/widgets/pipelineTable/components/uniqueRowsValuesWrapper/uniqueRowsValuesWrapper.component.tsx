import { FC, memo, useMemo, useState } from 'react';

import { UniqueRowsProps } from '../../types/props';
import SelectAllButton from '../../ui/selectAllButton/selectAllButton.component';
import AddToFilterButton from '../../ui/addToFilterButton/addToFilterButton.component';
import ApplyExtendedFilterButton from '../../ui/applyExtendedFilterButton/applyExtendedFilterButton.component';
import UniqueRowsValues from '../uniqueRowsValues/uniqueRowsValues.component';
import { getSortedRows } from '../../helpers/sortRows';
import { isRangeComparedCellValue, isSearchComparedCellValue } from '../../helpers/searchRows';
import { getUniqueRowsValues } from '../../helpers/getUniqueRowsValue';
import { MAX_COUNT_UNIQUE_ROWS } from '../../consts/tableSettings';
import { SEARCH_TYPES, SORT_TYPES } from '../../consts/searchSettings';
import { ExcelRow } from '../../types/pipelineTable';

import styles from './uniqueRowsValuesWrapper.module.scss';

const UniqueRowsValuesWrapper: FC<UniqueRowsProps> = ({
  vtdId,
  type,
  index,
  columnCheckedUniqueRowsValues,
  filteredRows,
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
        !row.hidden && !isSearchComparedCellValue({ cellValue: row.cells[index].value, searchValue, searchCompareTypes })
          ? { ...row, hidden: true }
          : row,
      );
    }

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue)) {
      return filteredRows.map((row) =>
        !row.hidden && !isRangeComparedCellValue({ cellValue: row.cells[index].value, fromValue, toValue })
          ? { ...row, hidden: true }
          : row,
      );
    }

    return filteredRows;
  }, [filteredRows, searchType, searchValue, index, searchCompareTypes, fromValue, toValue]);

  const visibleRows = useMemo(() => filteredRowsBySearch.filter(({ hidden }) => !hidden), [filteredRowsBySearch]);

  const uniqueRowsValues = useMemo(
    () =>
      getUniqueRowsValues({
        rows: getSortedRows({ rows: visibleRows, index, sortType: SORT_TYPES.asc }),
        index,
        maxCount: MAX_COUNT_UNIQUE_ROWS,
      }),
    [index, visibleRows],
  );

  if (!visibleRows.length) return <div className={styles.noResults}>Результаты не найдены</div>;

  return (
    <div className={styles.uniqueRowsValuesWrapper}>
      {uniqueRowsValues.length >= MAX_COUNT_UNIQUE_ROWS && (
        <div className={styles.maxCountUniqueRowsValues}>Показаны {MAX_COUNT_UNIQUE_ROWS} уникальных элементов</div>
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
        columnCheckedUniqueRowsValues={columnCheckedUniqueRowsValues}
        setCheckedUniqueRowsValues={setCheckedUniqueRowsValues}
        inputValue={inputValue}
      />
      <ApplyExtendedFilterButton
        vtdId={vtdId}
        type={type}
        index={index}
        columnCheckedUniqueRowsValues={columnCheckedUniqueRowsValues}
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
