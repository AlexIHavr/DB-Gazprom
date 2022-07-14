import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAppSelector } from '../../../../hooks/redux';
import TableHeadCell from '../../../commons/tableHeadCell/TableHeadCell';
import { PAGES } from '../../constants';

import { COLUMN_HEIGHT, COLUMN_WIDTH, ROW_HEIGHT, VIRTUAL_ROWS_COUNT } from './constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const { [PAGES.vtdForm.param]: vtdId } = useParams();

  const [rowIndex, setRowIndex] = useState(0);
  const [columnIndex, setColumnIndex] = useState(0);
  const [rowsOnPageCount, setRowsOnPageCount] = useState(0);
  const [columnsOnPageCount, setColumnsOnPageCount] = useState(0);
  const [virtualScrollStyle, setVirtualScrollStyle] = useState({});

  const pipeline = useMemo(() => vtdTree.find(({ id }) => id === vtdId), [vtdTree, vtdId]);

  const vtdForm = pipeline?.pipelineData.form!;

  const virtualScrollRef = useRef<HTMLDivElement>(null);

  const visibleColumns = useMemo(
    () => vtdForm.columns.filter(({ hidden }) => !hidden),
    [vtdForm.columns],
  );

  const columnsOnPage = useMemo(
    () => visibleColumns.slice(columnIndex, columnIndex + columnsOnPageCount),
    [visibleColumns, columnIndex, columnsOnPageCount],
  );

  const rowsOnPage = useMemo(
    () => vtdForm.rows.slice(rowIndex, rowIndex + rowsOnPageCount),
    [vtdForm, rowIndex, rowsOnPageCount],
  );

  const visibleColumnsSum = useMemo(
    () => visibleColumns.reduce((sumWidth, { width }) => sumWidth + width, 0),
    [visibleColumns],
  );

  const virtualScrollContentStyle = useMemo(
    () => ({
      width: visibleColumnsSum,
      height: vtdForm.rows.length * ROW_HEIGHT,
    }),
    [vtdForm.rows.length, visibleColumnsSum],
  );

  const tableStyle = useMemo(
    () => ({
      left: visibleColumns
        .slice(0, columnIndex)
        .reduce((sumWidth, { width }) => sumWidth + width, 0),
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
      const newRowIndex = Math.max(
        0,
        Math.floor(e.currentTarget.scrollTop / ROW_HEIGHT) - VIRTUAL_ROWS_COUNT,
      );

      if (rowIndex !== newRowIndex) setRowIndex(newRowIndex);

      let columnsWidth = 0;
      const newColumnIndex = Math.max(
        0,
        visibleColumns.findIndex(({ width }) => {
          columnsWidth += width;
          return e.currentTarget.scrollLeft <= columnsWidth;
        }) - VIRTUAL_ROWS_COUNT,
      );

      if (columnIndex !== newColumnIndex) setColumnIndex(newColumnIndex);

      const pipelineTable = e.currentTarget.firstChild!.firstChild as HTMLDivElement;
      pipelineTable.style.top = e.currentTarget.scrollTop + 'px';
    },
    [rowIndex, columnIndex, visibleColumns],
  );

  useEffect(() => {
    const virtualScrollCurrent = virtualScrollRef.current;

    if (virtualScrollCurrent) {
      const documentElement = document.documentElement;
      const virtualScrollHeight = documentElement.clientHeight - virtualScrollCurrent.offsetTop;

      setRowsOnPageCount(Math.floor((virtualScrollHeight - COLUMN_HEIGHT) / ROW_HEIGHT));
      setColumnsOnPageCount(
        Math.floor((documentElement.clientWidth - virtualScrollCurrent.offsetLeft) / COLUMN_WIDTH) +
          VIRTUAL_ROWS_COUNT * 2,
      );
      setVirtualScrollStyle({
        height: virtualScrollHeight,
      });
    }
  }, []);

  return (
    <div className="vtdForm">
      <h1>{pipeline?.pipeline}</h1>
      {vtdForm && vtdId && (
        <div
          className="virtualScroll"
          onScroll={virtualOnScroll}
          ref={virtualScrollRef}
          style={virtualScrollStyle}
        >
          <div style={virtualScrollContentStyle} className="virtualScrollContent">
            <table style={tableStyle}>
              <thead>
                <tr>
                  {columnsOnPage.map((column) => (
                    <TableHeadCell
                      key={column.id}
                      vtdId={vtdId}
                      tableType="form"
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
                      .filter((_, i) => !vtdForm.columns[i].hidden)
                      .slice(columnIndex, columnIndex + columnsOnPageCount)
                      .map((cell) => (
                        <td key={v4()} style={rowStyle}>
                          {cell}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VtdForm;
