import { FC, memo, UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PipelineTableProps } from 'redux/vtds/types';

import { COLUMN_HEIGHT, COLUMN_WIDTH, ROW_HEIGHT, VIRTUAL_COLUMNS_COUNT } from '../../consts/tableSettings';
import TableWrapper from '../tableWrapper/tableWrapper.component';

import './virtualScrollWrapper.styles.scss';

type VirtualScrollWrapperProps = PipelineTableProps & {
  height?: number;
  width?: number;
};

const VirtualScrollWrapper: FC<VirtualScrollWrapperProps> = ({ table, vtdId, tableType, width, height }) => {
  const [rowIndex, setRowIndex] = useState(0);
  const [columnIndex, setColumnIndex] = useState(0);
  const [rowsOnPageCount, setRowsOnPageCount] = useState(0);
  const [columnsOnPageCount, setColumnsOnPageCount] = useState(0);

  const virtualScrollRef = useRef<HTMLDivElement>(null);
  const virtualScrollContentRef = useRef<HTMLDivElement>(null);

  const visibleColumns = useMemo(() => table.columns.filter(({ hidden }) => !hidden), [table.columns]);
  const visibleRows = useMemo(() => table.rows.filter(({ hidden }) => !hidden), [table.rows]);

  const columnsOnPage = useMemo(
    () => visibleColumns.slice(columnIndex, columnIndex + columnsOnPageCount),
    [visibleColumns, columnIndex, columnsOnPageCount],
  );

  const rowsOnPage = useMemo(
    () => visibleRows.slice(rowIndex, rowIndex + rowsOnPageCount),
    [visibleRows, rowIndex, rowsOnPageCount],
  );

  const virtualScrollStyle = useMemo(
    () => ({
      maxWidth: visibleColumns.length < (virtualScrollRef.current?.clientWidth || 0) ? 'fit-content' : 'inherit',
    }),
    [visibleColumns.length],
  );

  const virtualScrollContentStyle = useMemo(
    () => ({
      width: visibleColumns.reduce((sumWidth, { width }) => sumWidth + width, 0),
      height: (visibleRows.length + 1) * ROW_HEIGHT + COLUMN_HEIGHT,
    }),
    [visibleColumns, visibleRows.length],
  );

  const tableStyle = useMemo(
    () => ({
      left: visibleColumns.slice(0, columnIndex).reduce((sumWidth, { width }) => sumWidth + width, 0),
    }),
    [columnIndex, visibleColumns],
  );

  const virtualOnScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const newRowIndex = Math.floor(e.currentTarget.scrollTop / ROW_HEIGHT);
      const pipelineTable = e.currentTarget.firstChild!.firstChild as HTMLTableElement;

      if (rowIndex !== newRowIndex) setRowIndex(newRowIndex);
      pipelineTable.style.top = e.currentTarget.scrollTop + 'px';

      let columnsWidth = 0;
      const newColumnIndex = Math.max(
        0,
        visibleColumns.findIndex(({ width }) => {
          columnsWidth += width;
          return e.currentTarget.scrollLeft <= columnsWidth;
        }) - VIRTUAL_COLUMNS_COUNT,
      );

      if (columnIndex !== newColumnIndex) setColumnIndex(newColumnIndex);
    },
    [rowIndex, visibleColumns, columnIndex],
  );

  useEffect(() => {
    const virtualScrollCurrent = virtualScrollRef.current!;
    const documentElement = document.documentElement;

    virtualScrollCurrent.style.height = (height || documentElement.clientHeight - virtualScrollCurrent.offsetTop) + 'px';
    virtualScrollCurrent.style.width = (width || documentElement.clientWidth - virtualScrollCurrent.offsetLeft) + 'px';
    virtualScrollContentRef.current!.style.minHeight = virtualScrollCurrent.style.height;

    setRowsOnPageCount(Math.floor((virtualScrollCurrent.clientHeight - COLUMN_HEIGHT) / ROW_HEIGHT));
    setColumnsOnPageCount(Math.floor(virtualScrollCurrent.clientWidth / COLUMN_WIDTH) + VIRTUAL_COLUMNS_COUNT * 2);
  }, [height, width]);

  return (
    <div className="virtualScroll" onScroll={virtualOnScroll} style={virtualScrollStyle} ref={virtualScrollRef}>
      <div style={virtualScrollContentStyle} className="virtualScrollContent" ref={virtualScrollContentRef}>
        <TableWrapper
          table={table}
          vtdId={vtdId}
          tableType={tableType}
          columnsOnPage={columnsOnPage}
          rowsOnPage={rowsOnPage}
          style={tableStyle}
        />
      </div>
    </div>
  );
};

export default memo(VirtualScrollWrapper);
