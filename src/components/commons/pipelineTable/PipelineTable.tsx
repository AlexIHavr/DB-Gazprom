import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';

import { PipelineDataTables, PipelineTable as PipelineTableType } from '../../../redux/vtdTree/types';
import { SORT_TYPES } from '../../../redux/vtdTree/constants';

import { COLUMN_HEIGHT, COLUMN_WIDTH, ROW_HEIGHT, VIRTUAL_COLUMNS_COUNT } from './constants';
import TableHead from './tableHead/TableHead';
import TableManagePanel from './tableManagePanel/TableManagePanel';

import './pipelineTable.scss';

type PipelineTableProps = {
  table: PipelineTableType;
  vtdId: string;
  tableType: PipelineDataTables;
};

const PipelineTable: React.FC<PipelineTableProps> = ({ table, vtdId, tableType }) => {
  const [rowIndex, setRowIndex] = useState(0);
  const [columnIndex, setColumnIndex] = useState(0);
  const [rowsOnPageCount, setRowsOnPageCount] = useState(0);
  const [columnsOnPageCount, setColumnsOnPageCount] = useState(0);

  const virtualScrollRef = useRef<HTMLDivElement>(null);

  const sortedRows = useMemo(() => {
    const filteredColumn = table.sortedColumn;

    if (filteredColumn) {
      const rowsCopy = table.rows.map((row) => [...row]);
      const columnIndex = filteredColumn.columnIndex;

      return rowsCopy
        .filter((row) => row[columnIndex] !== undefined)
        .sort((nextRow, row) => {
          switch (filteredColumn.sortType) {
            case SORT_TYPES.desc:
              return row[columnIndex]! > nextRow[columnIndex]! ? 1 : -1;
            case SORT_TYPES.asc:
              return row[columnIndex]! < nextRow[columnIndex]! ? 1 : -1;
            default:
              return 0;
          }
        })
        .concat(rowsCopy.filter((row) => row[columnIndex] === undefined));
    }

    return table.rows;
  }, [table.rows, table.sortedColumn]);

  const visibleColumns = useMemo(() => table.columns.filter(({ hidden }) => !hidden), [table.columns]);

  const columnsOnPage = useMemo(
    () => visibleColumns.slice(columnIndex, columnIndex + columnsOnPageCount),
    [visibleColumns, columnIndex, columnsOnPageCount],
  );

  const rowsOnPage = useMemo(
    () => sortedRows.slice(rowIndex, rowIndex + rowsOnPageCount),
    [sortedRows, rowIndex, rowsOnPageCount],
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
      height: (table.rows.length + 1) * ROW_HEIGHT + COLUMN_HEIGHT,
    }),
    [visibleColumns, table.rows.length],
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

  useEffect(() => {
    const virtualScrollCurrent = virtualScrollRef.current;

    if (virtualScrollCurrent) {
      const documentElement = document.documentElement;
      virtualScrollCurrent.style.height = documentElement.clientHeight - virtualScrollCurrent.offsetTop + 'px';
      virtualScrollCurrent.style.width = documentElement.clientWidth - virtualScrollCurrent.offsetLeft + 'px';

      setRowsOnPageCount(Math.floor((virtualScrollCurrent.clientHeight - COLUMN_HEIGHT) / ROW_HEIGHT));
      setColumnsOnPageCount(Math.floor(virtualScrollCurrent.clientWidth / COLUMN_WIDTH) + VIRTUAL_COLUMNS_COUNT * 2);
    }
  }, []);

  return (
    <div className="pipelineTable">
      <TableManagePanel table={table} vtdId={vtdId} tableType={tableType} />
      <div className="virtualScroll" onScroll={virtualOnScroll} ref={virtualScrollRef} style={virtualScrollStyle}>
        <div style={virtualScrollContentStyle} className="virtualScrollContent">
          <table style={tableStyle}>
            <thead>
              <tr>
                {columnsOnPage.map((column) => (
                  <TableHead
                    key={column.id}
                    table={table}
                    vtdId={vtdId}
                    tableType={tableType}
                    column={column}
                    style={{
                      minWidth: COLUMN_WIDTH,
                      maxWidth: COLUMN_WIDTH,
                      height: COLUMN_HEIGHT,
                    }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {rowsOnPage.map((row) => (
                <tr key={v4()}>
                  {row
                    .filter((_, i) => !table.columns[i].hidden)
                    .slice(columnIndex, columnIndex + columnsOnPageCount)
                    .map((cell) => (
                      <td key={v4()} style={rowStyle} title={cell ? String(cell) : ''}>
                        {cell}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PipelineTable;
