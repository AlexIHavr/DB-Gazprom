import { FC, memo, UIEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { PipelineTableProps } from '../../types/props';
import { COLUMN_HEIGHT, COLUMN_WIDTH, ROW_HEIGHT, VIRTUAL_COLUMNS_COUNT } from '../../consts/tableSettings';
import TableWrapper from '../tableWrapper/tableWrapper.component';

import styles from './virtualScrollWrapper.module.scss';

const VirtualScrollWrapper: FC<PipelineTableProps> = ({ table, width, height }) => {
  const [rowIndex, setRowIndex] = useState(0);
  const [columnIndex, setColumnIndex] = useState(0);
  const [rowsOnPageCount, setRowsOnPageCount] = useState(0);
  const [columnsOnPageCount, setColumnsOnPageCount] = useState(0);
  const [virtualScrollMaxWidth, setVirtualScrollMaxWidth] = useState('inherit');

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
      maxWidth: virtualScrollMaxWidth,
    }),
    [virtualScrollMaxWidth],
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

  const virtualOnScroll = (e: UIEvent<HTMLDivElement>) => {
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
  };

  useLayoutEffect(() => {
    const virtualScrollCurrent = virtualScrollRef.current!;
    const documentElement = document.documentElement;

    virtualScrollCurrent.style.height = (height || documentElement.clientHeight - virtualScrollCurrent.offsetTop) + 'px';
    virtualScrollCurrent.style.width = (width || documentElement.clientWidth - virtualScrollCurrent.offsetLeft) + 'px';
    virtualScrollContentRef.current!.style.minHeight = virtualScrollCurrent.style.height;

    setRowsOnPageCount(Math.floor((virtualScrollCurrent.clientHeight - COLUMN_HEIGHT) / ROW_HEIGHT));
    setColumnsOnPageCount(Math.floor(virtualScrollCurrent.clientWidth / COLUMN_WIDTH) + VIRTUAL_COLUMNS_COUNT * 2);
    setVirtualScrollMaxWidth(visibleColumns.length < virtualScrollCurrent.clientWidth ? 'fit-content' : 'inherit');
  }, [height, visibleColumns.length, width]);

  return (
    <div className={styles.virtualScroll} onScroll={virtualOnScroll} style={virtualScrollStyle} ref={virtualScrollRef}>
      <div style={virtualScrollContentStyle} className={styles.virtualScrollContent} ref={virtualScrollContentRef}>
        <TableWrapper table={table} columnsOnPage={columnsOnPage} rowsOnPage={rowsOnPage} style={tableStyle} />
      </div>
    </div>
  );
};

export default memo(VirtualScrollWrapper);
