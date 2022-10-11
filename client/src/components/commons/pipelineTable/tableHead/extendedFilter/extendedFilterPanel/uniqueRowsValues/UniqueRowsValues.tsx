import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { getSortedRows, getUniqueRowsValues } from '../../../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../../../hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from '../../../../../../../redux/vtds/reducer';
import { ExcelRow, ExcelValue, PipelineColumn, TableType, PipelineRows } from '../../../../../../../redux/vtds/types';
import { SORT_TYPES } from '../../../sortFilter/constants';
import { SEARCH_TYPES } from '../constants';
import { ReactComponent as CheckBoxBlackRegular } from '../../../../../../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../../../../../../assets/svg/checkBoxRegular.svg';

import { MAX_COUNT_UNIQUE_ROWS, UNIQUE_ROW_HEIGHT } from './constants';
import './uniqueRowsValues.scss';

type UniqueRowsProps = {
  vtdId: string;
  tableType: TableType;
  filteredRows: PipelineRows;
  visibleRows: PipelineRows;
  filteredRowsWithoutSearch: PipelineRows;
  column: PipelineColumn;
  searchValue: string;
  fromValue: string;
  toValue: string;
  searchType: SEARCH_TYPES;
};

const UniqueRowsValues: React.FC<UniqueRowsProps> = ({
  vtdId,
  tableType,
  filteredRows,
  visibleRows,
  filteredRowsWithoutSearch,
  column,
  searchValue,
  fromValue,
  toValue,
  searchType,
}) => {
  const dispatch = useAppDispatch();

  const [uniqueRowValueIndex, setUniqueRowsValueIndex] = useState(0);
  const [visibleCountUniqueRowsValues, setVisibleCountUniqueRowsValues] = useState(0);
  const [checkedUniqueRowsValues, setCheckedUniqueRowsValues] = useState<ExcelRow>([]);
  const [isAddToCheckedUniqueRowsValues, setIsAddToCheckedUniqueRowsValues] = useState(false);

  const uniqueRowsValuesRef = useRef<HTMLDivElement>(null);

  const uniqueRowsValues = useMemo(() => {
    const sortedFilteredRows = getSortedRows({
      rows: visibleRows,
      columnIndex: column.index,
      sortType: SORT_TYPES.asc,
    });

    const uniqueRowsValues = getUniqueRowsValues({
      rows: sortedFilteredRows,
      columnIndex: column.index,
      maxCount: MAX_COUNT_UNIQUE_ROWS,
    });

    return uniqueRowsValues;
  }, [column.index, visibleRows]);

  const uniqueRowsValuesContentStyle = useMemo(
    () => ({
      height: (uniqueRowsValues.length + 1) * UNIQUE_ROW_HEIGHT,
    }),
    [uniqueRowsValues.length],
  );

  const uniqueRowsValuesOnDisplay = useMemo(
    () => uniqueRowsValues.slice(uniqueRowValueIndex, uniqueRowValueIndex + visibleCountUniqueRowsValues),
    [uniqueRowValueIndex, uniqueRowsValues, visibleCountUniqueRowsValues],
  );

  const uniqueRowsValuesOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newUniqueRowValueIndex = Math.floor(e.currentTarget.scrollTop / UNIQUE_ROW_HEIGHT);
      if (uniqueRowValueIndex !== newUniqueRowValueIndex) setUniqueRowsValueIndex(newUniqueRowValueIndex);

      const uniqueRowsValuesOnDisplay = e.currentTarget.firstChild!.firstChild as HTMLDivElement;
      uniqueRowsValuesOnDisplay.style.top = e.currentTarget.scrollTop + 'px';
    },
    [uniqueRowValueIndex],
  );

  const toggleCheckedUniqueRowValueOnClick = useCallback(
    (rowValue: ExcelValue) =>
      setCheckedUniqueRowsValues((prev) =>
        prev.includes(rowValue) ? prev.filter((value) => value !== rowValue) : [...prev, rowValue],
      ),
    [setCheckedUniqueRowsValues],
  );

  const toggleAllCheckedUniqueRowValueOnClick = useCallback(
    () => setCheckedUniqueRowsValues((prev) => (prev.length === uniqueRowsValues.length ? [] : uniqueRowsValues)),
    [setCheckedUniqueRowsValues, uniqueRowsValues],
  );

  const setIsAddToCheckedUniqueRowsValuesOnClick = useCallback(() => setIsAddToCheckedUniqueRowsValues((prev) => !prev), []);

  const applyExtendedFilterOnClick = useCallback(() => {
    let newCheckedUniqueRowsValues = checkedUniqueRowsValues;

    //filtering newCheckedUniqueRowsValues
    if (isAddToCheckedUniqueRowsValues) {
      const columnCheckedUniqueRowsValues = column.extendedFilter.checkedUniqueRowsValues;

      newCheckedUniqueRowsValues = columnCheckedUniqueRowsValues
        .filter((uniqueValue) => checkedUniqueRowsValues.includes(uniqueValue) || !uniqueRowsValues.includes(uniqueValue))
        .concat(checkedUniqueRowsValues.filter((uniqueValue) => !columnCheckedUniqueRowsValues.includes(uniqueValue)));
    }

    const newRows = (isAddToCheckedUniqueRowsValues ? filteredRowsWithoutSearch : filteredRows).map((row) =>
      !row.hidden && !newCheckedUniqueRowsValues.includes(row.values[column.index].value) ? { ...row, hidden: true } : row,
    );

    dispatch(
      setPipelineTableProperties({
        vtdId,
        tableType,
        properties: {
          rows: newRows,
        },
      }),
    );

    //reset checkedUniqueRowsValues for choosing all values
    if (
      uniqueRowsValues.length === checkedUniqueRowsValues.length &&
      !(searchValue || fromValue || toValue) &&
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
    isAddToCheckedUniqueRowsValues,
    column.extendedFilter.checkedUniqueRowsValues,
    column.index,
    checkedUniqueRowsValues,
    filteredRowsWithoutSearch,
    filteredRows,
    dispatch,
    vtdId,
    tableType,
    uniqueRowsValues,
    searchValue,
    fromValue,
    toValue,
    searchType,
  ]);

  useLayoutEffect(() => {
    if (uniqueRowsValuesRef.current)
      setVisibleCountUniqueRowsValues(Math.ceil(uniqueRowsValuesRef.current.offsetHeight / UNIQUE_ROW_HEIGHT) - 1);

    setCheckedUniqueRowsValues(
      !column.extendedFilter.checkedUniqueRowsValues.length || searchValue || fromValue || toValue
        ? uniqueRowsValues
        : uniqueRowsValues.filter((value) => column.extendedFilter.checkedUniqueRowsValues.includes(value)),
    );
  }, [column.extendedFilter.checkedUniqueRowsValues, fromValue, searchValue, toValue, uniqueRowsValues]);

  return (
    <>
      {uniqueRowsValues.length >= MAX_COUNT_UNIQUE_ROWS && (
        <div className="maxCountUniqueRowsValues">Показаны {MAX_COUNT_UNIQUE_ROWS} уникальных элементов</div>
      )}

      <div className="selectAllWrapper" onClick={toggleAllCheckedUniqueRowValueOnClick}>
        {checkedUniqueRowsValues.length === uniqueRowsValues.length ? (
          <CheckBoxRegular />
        ) : checkedUniqueRowsValues.length ? (
          <>
            <div className="isSomeCheckedRowsValues"></div>
            <CheckBoxBlackRegular />
          </>
        ) : (
          <CheckBoxBlackRegular />
        )}
        <span className="selectAll">Выделить все</span>
      </div>

      {(searchValue || fromValue || toValue) && (
        <div className="selectAddToCheckedUniqueRowsValues" onClick={setIsAddToCheckedUniqueRowsValuesOnClick}>
          {isAddToCheckedUniqueRowsValues ? <CheckBoxRegular /> : <CheckBoxBlackRegular />}
          <span>Добавить в фильтр</span>
        </div>
      )}

      <div className="uniqueRowsValues" onScroll={uniqueRowsValuesOnScroll} ref={uniqueRowsValuesRef}>
        <div className="uniqueRowsValuesContent" style={uniqueRowsValuesContentStyle}>
          <div className="uniqueRowsValuesOnDisplay">
            {uniqueRowsValuesOnDisplay.map((uniqueRowValue, i) => (
              <div key={i} onClick={() => toggleCheckedUniqueRowValueOnClick(uniqueRowValue)}>
                {checkedUniqueRowsValues.includes(uniqueRowValue) ? <CheckBoxRegular /> : <CheckBoxBlackRegular />}
                <span>{uniqueRowValue === null ? '(Пустые)' : uniqueRowValue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        className="apply"
        onClick={applyExtendedFilterOnClick}
        disabled={!checkedUniqueRowsValues.length && !isAddToCheckedUniqueRowsValues}
      >
        ОК
      </button>
    </>
  );
};

export default memo(UniqueRowsValues);
