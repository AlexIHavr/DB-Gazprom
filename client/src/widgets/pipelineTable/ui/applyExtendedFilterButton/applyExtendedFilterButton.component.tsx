import { useAppDispatch } from 'hooks/redux';
import { FC, memo, useCallback } from 'react';
import { SEARCH_TYPES } from 'redux/vtds/constants';
import { setColumnProperties, setPipelineTableProperties } from 'redux/vtds/reducer';
import { UniqueRowsProps, UniqueRowsValuesProps } from 'redux/vtds/types';

import { getUniqueRowsValues } from '../../helpers/getUniqueRowsValue';
import { MAX_COUNT_UNIQUE_ROWS } from '../../consts/tableSettings';

import './applyExtendedFilterButton.styles.scss';

type ApplyExtendedFilterButtonProps = Omit<UniqueRowsProps, 'searchCompareTypes'> &
  Omit<UniqueRowsValuesProps, 'setCheckedUniqueRowsValues'> & {
    isAddToFilter: boolean;
  };

const ApplyExtendedFilterButton: FC<ApplyExtendedFilterButtonProps> = ({
  vtdId,
  tableType,
  column,
  isAddToFilter,
  filteredRows,
  uniqueRowsValues,
  checkedUniqueRowsValues,
  fromValue,
  searchType,
  searchValue,
  toValue,
}) => {
  const dispatch = useAppDispatch();

  const applyExtendedFilterOnClick = useCallback(() => {
    let newCheckedUniqueRowsValues = checkedUniqueRowsValues;

    //filtering newCheckedUniqueRowsValues
    if (isAddToFilter) {
      const columnCheckedUniqueRowsValues = column.extendedFilter.checkedUniqueRowsValues;

      newCheckedUniqueRowsValues = (
        columnCheckedUniqueRowsValues.length
          ? columnCheckedUniqueRowsValues
          : getUniqueRowsValues({ rows: filteredRows, columnIndex: column.index, maxCount: MAX_COUNT_UNIQUE_ROWS })
      )
        .filter((uniqueValue) => checkedUniqueRowsValues.includes(uniqueValue) || !uniqueRowsValues.includes(uniqueValue))
        .concat(checkedUniqueRowsValues.filter((uniqueValue) => !columnCheckedUniqueRowsValues.includes(uniqueValue)));
    }

    const newFilteredRows = filteredRows.map((row) =>
      !row.hidden && !newCheckedUniqueRowsValues.includes(row.cells[column.index].value) ? { ...row, hidden: true } : row,
    );

    dispatch(setPipelineTableProperties({ vtdId, tableType, properties: { rows: newFilteredRows } }));

    //reset newCheckedUniqueRowsValues for choosing all values
    if (
      uniqueRowsValues.length === checkedUniqueRowsValues.length &&
      !isAddToFilter &&
      uniqueRowsValues.length < MAX_COUNT_UNIQUE_ROWS
    ) {
      newCheckedUniqueRowsValues = [];
    }

    //set inputValues
    const inputValues = searchType === SEARCH_TYPES.search ? { searchValue } : { fromValue, toValue };

    dispatch(
      setColumnProperties({
        vtdId,
        tableType,
        columnIndex: column.index,
        properties: {
          extendedFilter: {
            visible: false,
            checkedUniqueRowsValues: newCheckedUniqueRowsValues,
            searchType,
            ...inputValues,
          },
        },
      }),
    );
  }, [
    checkedUniqueRowsValues,
    isAddToFilter,
    filteredRows,
    dispatch,
    vtdId,
    tableType,
    uniqueRowsValues,
    searchType,
    searchValue,
    fromValue,
    toValue,
    column.index,
    column.extendedFilter.checkedUniqueRowsValues,
  ]);

  return (
    <button
      className="applyExtendedFilter"
      onClick={applyExtendedFilterOnClick}
      disabled={!checkedUniqueRowsValues.length && !isAddToFilter}
    >
      ОК
    </button>
  );
};

export default memo(ApplyExtendedFilterButton);
