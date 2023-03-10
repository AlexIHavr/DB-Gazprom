import { useState, useRef, useMemo, useCallback, useEffect, memo } from 'react';
import { v4 } from 'uuid';
import classNames from 'classnames';
import { TableType, PipelineTable as PipelineTableType, InnerTables as InnerTablesType, InnerCellTables } from 'redux/vtds/types';

import { COLUMN_HEIGHT, COLUMN_WIDTH, ROW_HEIGHT, VIRTUAL_COLUMNS_COUNT } from './constants';
import TableHeader from './tableHeader/TableHeader';
import TableManagePanel from './tableManagePanel/TableManagePanel';
import InnerTables from './innerTables/InnerTables';

import './pipelineTable.scss';

type PipelineTableProps = {
  table: PipelineTableType;
  height?: number;
  width?: number;
  vtdId?: string;
  tableType?: TableType;
  innerTables?: InnerTablesType;
};

const PipelineTable: React.FC<PipelineTableProps> = ({ table, vtdId, tableType, innerTables, height, width }) => {
  const [rowIndex, setRowIndex] = useState(0);
  const [columnIndex, setColumnIndex] = useState(0);
  const [rowsOnPageCount, setRowsOnPageCount] = useState(0);
  const [columnsOnPageCount, setColumnsOnPageCount] = useState(0);
  const [innerCellTables, setInnerCellTables] = useState<InnerCellTables>();

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

  const rowStyle = useMemo(
    () => ({
      minWidth: COLUMN_WIDTH,
      maxWidth: COLUMN_WIDTH,
      height: ROW_HEIGHT,
    }),
    [],
  );

  const columnStyle = useMemo(
    () => ({
      minWidth: COLUMN_WIDTH,
      maxWidth: COLUMN_WIDTH,
      height: COLUMN_HEIGHT,
    }),
    [],
  );

  const virtualOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const newRowIndex = Math.floor(e.currentTarget.scrollTop / ROW_HEIGHT);
      const pipelineTable = e.currentTarget.firstChild!.firstChild as HTMLDivElement;

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

  const setInnerCellTablesOnClick = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>, innerCellTables?: InnerCellTables) => {
      e.preventDefault();
      setInnerCellTables(innerCellTables);
    },
    [],
  );

  useEffect(() => {
    //table on full window
    const virtualScrollCurrent = virtualScrollRef.current!;
    const documentElement = document.documentElement;

    virtualScrollCurrent.style.height = (height || documentElement.clientHeight - virtualScrollCurrent.offsetTop) + 'px';
    virtualScrollCurrent.style.width = (width || documentElement.clientWidth - virtualScrollCurrent.offsetLeft) + 'px';
    virtualScrollContentRef.current!.style.minHeight = virtualScrollCurrent.style.height;

    setRowsOnPageCount(Math.floor((virtualScrollCurrent.clientHeight - COLUMN_HEIGHT) / ROW_HEIGHT));
    setColumnsOnPageCount(Math.floor(virtualScrollCurrent.clientWidth / COLUMN_WIDTH) + VIRTUAL_COLUMNS_COUNT * 2);
  }, [height, width]);

  return (
    <div className="pipelineTable">
      {vtdId && tableType && <TableManagePanel table={table} vtdId={vtdId} tableType={tableType} />}
      {innerCellTables && <InnerTables innerTablesData={innerCellTables} />}

      <div className="virtualScroll" onScroll={virtualOnScroll} style={virtualScrollStyle} ref={virtualScrollRef}>
        <div style={virtualScrollContentStyle} className="virtualScrollContent" ref={virtualScrollContentRef}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {columnsOnPage.map((column) => (
                  <TableHeader
                    key={column.id}
                    table={table}
                    vtdId={vtdId}
                    tableType={tableType}
                    column={column}
                    style={columnStyle}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {rowsOnPage.map(({ id, values }, rowI) => (
                <tr key={id}>
                  {values
                    .filter((_, i) => !table.columns[i].hidden)
                    .slice(columnIndex, columnIndex + columnsOnPageCount)
                    .map((cell, columnI) => {
                      const innerCellTables =
                        innerTables && innerTables[columnI + columnIndex] && innerTables[columnI + columnIndex][rowI + rowIndex];

                      return (
                        <td
                          key={v4()}
                          style={rowStyle}
                          title={cell.value ? String(cell.value) : ''}
                          className={classNames({ clickable: innerCellTables })}
                          onClick={(e) => setInnerCellTablesOnClick(e, innerCellTables)}
                        >
                          {cell.value}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(PipelineTable);
