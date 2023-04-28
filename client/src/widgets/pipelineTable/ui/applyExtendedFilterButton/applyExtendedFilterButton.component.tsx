import { FC, memo } from 'react';

import { getUniqueRowsValues } from '../../helpers/getUniqueRowsValue';
import { MAX_COUNT_UNIQUE_ROWS } from '../../consts/tableSettings';
import usePipelineTableStore from '../../pipelineTable.store';
import { ApplyExtendedFilterButtonProps } from '../../types/props';
import { SEARCH_TYPES } from '../../consts/searchSettings';

import styles from './applyExtendedFilterButton.module.scss';

const ApplyExtendedFilterButton: FC<ApplyExtendedFilterButtonProps> = ({
  vtdId,
  type,
  columnCheckedUniqueRowsValues,
  index,
  isAddToFilter,
  filteredRows,
  uniqueRowsValues,
  checkedUniqueRowsValues,
  fromValue,
  searchType,
  searchValue,
  toValue,
}) => {
  const [setColumnProperties, setPipelineTableRows] = usePipelineTableStore((state) => [
    state.setColumnProperties,
    state.setPipelineTableRows,
  ]);

  const applyExtendedFilterOnClick = () => {
    let newCheckedUniqueRowsValues = checkedUniqueRowsValues;

    //filtering newCheckedUniqueRowsValues
    if (isAddToFilter) {
      newCheckedUniqueRowsValues = (
        columnCheckedUniqueRowsValues.length
          ? columnCheckedUniqueRowsValues
          : getUniqueRowsValues({ rows: filteredRows, index, maxCount: MAX_COUNT_UNIQUE_ROWS })
      )
        .filter((uniqueValue) => checkedUniqueRowsValues.includes(uniqueValue) || !uniqueRowsValues.includes(uniqueValue))
        .concat(checkedUniqueRowsValues.filter((uniqueValue) => !columnCheckedUniqueRowsValues.includes(uniqueValue)));
    }

    const newFilteredRows = filteredRows.map((row) =>
      !row.hidden && !newCheckedUniqueRowsValues.includes(row.cells[index].value) ? { ...row, hidden: true } : row,
    );

    setPipelineTableRows({ vtdId, type, rows: newFilteredRows });

    //reset newCheckedUniqueRowsValues for choosing all values
    if (
      uniqueRowsValues.length === checkedUniqueRowsValues.length &&
      !(searchValue || fromValue || toValue) &&
      uniqueRowsValues.length < MAX_COUNT_UNIQUE_ROWS
    ) {
      newCheckedUniqueRowsValues = [];
    }

    //set inputValues
    const inputValues = searchType === SEARCH_TYPES.search ? { searchValue } : { fromValue, toValue };

    setColumnProperties({
      vtdId,
      type,
      index,
      properties: {
        extendedFilter: { visible: false, checkedUniqueRowsValues: newCheckedUniqueRowsValues, searchType, ...inputValues },
      },
    });
  };

  return (
    <button
      className={styles.applyExtendedFilter}
      onClick={applyExtendedFilterOnClick}
      disabled={!checkedUniqueRowsValues.length && !isAddToFilter}
    >
      ОК
    </button>
  );
};

export default memo(ApplyExtendedFilterButton);
