import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from '@mui/icons-material';
import { Dispatch, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getSortedRows, getUniqueRowsValues } from '../../../../../../../helpers/pipelineTable';
import { ExcelRow, ExcelRows, ExcelValue, PipelineColumn } from '../../../../../../../redux/vtdTree/types';
import { SORT_TYPES } from '../../../sortFilter/constants';

import { MAX_COUNT_UNIQUE_ROWS, UNIQUE_ROW_HEIGHT } from './constants';
import './uniqueRowsValues.scss';

type UniqueRowsProps = {
  rows: ExcelRows;
  column: PipelineColumn;
  checkedUniqueRowsValues: ExcelRow;
  setCheckedUniqueRowsValues: Dispatch<React.SetStateAction<ExcelRow>>;
};

const UniqueRowsValues: React.FC<UniqueRowsProps> = ({ rows, column, checkedUniqueRowsValues, setCheckedUniqueRowsValues }) => {
  const [uniqueRowValueIndex, setUniqueRowsValueIndex] = useState(0);
  const [visibleCountUniqueRowsValues, setVisibleCountUniqueRowsValues] = useState(0);
  const [showMaxCountUniqueRowsValues, setShowMaxCountUniqueRowsValues] = useState(false);

  const uniqueRowsValuesRef = useRef<HTMLDivElement>(null);

  const uniqueRowsValues = useMemo(() => {
    const sortedRows = getSortedRows({
      rows,
      columnIndex: column.index,
      sortType: SORT_TYPES.asc,
    });

    const uniqueRowsValues = getUniqueRowsValues({
      rows: sortedRows,
      columnIndex: column.index,
      maxCount: MAX_COUNT_UNIQUE_ROWS,
    });

    const lastSortedRowValue = sortedRows.at(-1)![column.index];
    const lastUniqueRowsValue = uniqueRowsValues.at(-1);

    if (lastSortedRowValue !== lastUniqueRowsValue) {
      setShowMaxCountUniqueRowsValues(true);
    } else {
      setShowMaxCountUniqueRowsValues(false);
    }

    if (lastSortedRowValue === undefined) {
      if (lastUniqueRowsValue === undefined) uniqueRowsValues.pop();
      uniqueRowsValues.unshift(undefined);
    }

    setCheckedUniqueRowsValues(
      !column.extendedFilter.checkedUniqueRowsValues.length
        ? uniqueRowsValues
        : uniqueRowsValues.filter((value) => column.extendedFilter.checkedUniqueRowsValues.includes(value)),
    );

    return uniqueRowsValues;
  }, [column.extendedFilter.checkedUniqueRowsValues, column.index, rows, setCheckedUniqueRowsValues]);

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

  useEffect(() => {
    if (uniqueRowsValuesRef.current)
      setVisibleCountUniqueRowsValues(Math.ceil(uniqueRowsValuesRef.current.offsetHeight / UNIQUE_ROW_HEIGHT) - 1);
  }, []);

  return (
    <>
      {showMaxCountUniqueRowsValues && (
        <div className="maxCountUniqueRowsValues">Показаны {MAX_COUNT_UNIQUE_ROWS} уникальных элементов</div>
      )}

      <div className="selectAllWrapper" onClick={toggleAllCheckedUniqueRowValueOnClick}>
        {checkedUniqueRowsValues.length === uniqueRowsValues.length ? (
          <CheckBoxOutlined />
        ) : checkedUniqueRowsValues.length ? (
          <>
            <div className="isSomeCheckedRows"></div>
            <CheckBoxOutlineBlankOutlined />
          </>
        ) : (
          <CheckBoxOutlineBlankOutlined />
        )}
        <span className="selectAll">Выделить все</span>
      </div>

      <div className="uniqueRowsValues" onScroll={uniqueRowsValuesOnScroll} ref={uniqueRowsValuesRef}>
        <div className="uniqueRowsValuesContent" style={uniqueRowsValuesContentStyle}>
          <div className="uniqueRowsValuesOnDisplay">
            {uniqueRowsValuesOnDisplay.map((uniqueRowValue, i) => (
              <div key={i} onClick={() => toggleCheckedUniqueRowValueOnClick(uniqueRowValue)}>
                {checkedUniqueRowsValues.includes(uniqueRowValue) ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />}
                <span>{uniqueRowValue === undefined ? '(Пустые)' : uniqueRowValue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UniqueRowsValues);
