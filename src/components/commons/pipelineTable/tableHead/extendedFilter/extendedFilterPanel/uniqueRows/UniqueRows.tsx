import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from '@mui/icons-material';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getSortedRows, getUniqueRows } from '../../../../../../../helpers/pipelineTable';
import { ExcelRows, PipelineColumn } from '../../../../../../../redux/vtdTree/types';
import { SORT_TYPES } from '../../../sortFilter/constants';

import { MAX_COUNT_UNIQUE_ROWS, UNIQUE_ROW_HEIGHT } from './constants';
import './uniqueRows.scss';

type UniqueRowsProps = {
  rows: ExcelRows;
  column: PipelineColumn;
};

const UniqueRows: React.FC<UniqueRowsProps> = ({ rows, column }) => {
  const [uniqueRowsIndex, setUniqueRowsIndex] = useState(0);
  const [visibleCountUniqueRows, setVisibleCountUniqueRows] = useState(0);
  const [showMaxCountUniqueRows, setShowMaxCountUniqueRows] = useState(false);
  const uniqueRowsRef = useRef<HTMLDivElement>(null);

  const uniqueSortedRow = useMemo(() => {
    const sortedRows = getSortedRows({
      rows,
      columnIndex: column.index,
      sortType: SORT_TYPES.asc,
    });

    const uniqueRows = getUniqueRows({
      rows: sortedRows,
      columnIndex: column.index,
      maxCount: MAX_COUNT_UNIQUE_ROWS,
    });

    const lastSortedRowValue = sortedRows.at(-1)![column.index];
    const lastUniqueRowsValue = uniqueRows.at(-1);

    if (lastSortedRowValue !== lastUniqueRowsValue) {
      setShowMaxCountUniqueRows(true);
    } else {
      setShowMaxCountUniqueRows(false);
    }

    if (lastSortedRowValue === undefined) {
      if (lastUniqueRowsValue === undefined) uniqueRows.pop();
      uniqueRows.unshift('(Пустые)');
    }

    uniqueRows.unshift('Выделить все');

    return uniqueRows;
  }, [column.index, rows]);

  const uniqueRowsOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newUniqueRowsIndex = Math.floor(e.currentTarget.scrollTop / UNIQUE_ROW_HEIGHT);
      if (uniqueRowsIndex !== newUniqueRowsIndex) setUniqueRowsIndex(newUniqueRowsIndex);

      const uniqueRowsOnDisplay = e.currentTarget.firstChild!.firstChild as HTMLDivElement;
      uniqueRowsOnDisplay.style.top = e.currentTarget.scrollTop + 'px';
    },
    [uniqueRowsIndex],
  );

  const uniqueRowsContentStyle = useMemo(
    () => ({
      height: (uniqueSortedRow.length + 1) * UNIQUE_ROW_HEIGHT,
    }),
    [uniqueSortedRow.length],
  );

  const uniqueRowsOnDisplay = useMemo(
    () => uniqueSortedRow.slice(uniqueRowsIndex, uniqueRowsIndex + visibleCountUniqueRows),
    [uniqueRowsIndex, uniqueSortedRow, visibleCountUniqueRows],
  );

  useEffect(() => {
    if (uniqueRowsRef.current) setVisibleCountUniqueRows(Math.ceil(uniqueRowsRef.current.offsetHeight / UNIQUE_ROW_HEIGHT) - 1);
  }, []);

  return (
    <>
      {showMaxCountUniqueRows && <div className="maxCountUniqueRows">Показаны {MAX_COUNT_UNIQUE_ROWS} уникальных элементов</div>}
      <div className="uniqueRows" onScroll={uniqueRowsOnScroll} ref={uniqueRowsRef}>
        <div className="uniqueRowsContent" style={uniqueRowsContentStyle}>
          <div className="uniqueRowsOnDisplay">
            {uniqueRowsOnDisplay.map((uniqueRow, i) => (
              <div key={i}>
                {/* <CheckBoxOutlineBlankOutlined /> */}
                <CheckBoxOutlined />
                {!i && !uniqueRowsIndex ? <span className="selectAll">Выделить все</span> : <span>{uniqueRow}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UniqueRows);
