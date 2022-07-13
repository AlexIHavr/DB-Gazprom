import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAppSelector } from '../../../../hooks/redux';
import TableHeadCell from '../../../commons/tableHeadCell/TableHeadCell';
import { PAGES } from '../../constants';

import { COLUMN_HEIGHT, COLUMN_WIDTH, ROW_HEIGHT } from './constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const { [PAGES.vtdForm.param]: vtdId } = useParams();

  const [indexRow, setIndexRow] = useState(0);
  // const [indexColumn, setIndexColumn] = useState(0);
  const [countRowsOnPage, setCountRowsOnPage] = useState(0);
  // const [countColumnsOnPage, setCountColumnsOnPage] = useState(0);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const pipeline = useMemo(() => vtdTree.find(({ id }) => id === vtdId), [vtdTree, vtdId]);

  const vtdForm = pipeline?.pipelineData.form!;

  const virtualScrollRef = useRef<HTMLDivElement>(null);

  const visibleColumns = useMemo(
    () => vtdForm.columns.filter(({ hidden }) => !hidden),
    [vtdForm.columns],
  );

  const virtualOnScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop: number = e.currentTarget.scrollTop;
    // const scrollLeft: number = e.currentTarget.scrollLeft;

    const pipelineTable = e.currentTarget.firstChild!.firstChild as HTMLDivElement;

    pipelineTable.style.top = scrollTop + 'px';
    // pipelineTable.style.left = scrollLeft + 'px';

    setIndexRow(Math.floor(scrollTop / ROW_HEIGHT));
    // setIndexColumn(Math.floor(scrollLeft / COLUMN_WIDTH));
  }, []);

  const visibleColumnsSum = useMemo(
    () => visibleColumns.reduce((sumWidth, { width }) => sumWidth + width, 0),
    [visibleColumns],
  );

  useEffect(() => {
    const virtualScrollCurrent = virtualScrollRef.current;

    if (virtualScrollCurrent) {
      setCountRowsOnPage(
        Math.floor(
          (document.documentElement.clientHeight -
            COLUMN_HEIGHT -
            virtualScrollCurrent.offsetTop -
            scrollBarWidth) /
            ROW_HEIGHT,
        ),
      );
      // setCountColumnsOnPage(
      //   Math.floor((document.documentElement.clientWidth - scrollBarWidth) / COLUMN_WIDTH),
      // );
    }
  }, [scrollBarWidth]);

  useEffect(() => {
    if (virtualScrollRef.current) {
      setScrollBarWidth(
        virtualScrollRef.current.offsetWidth - virtualScrollRef.current.clientWidth,
      );
    }
  }, [countRowsOnPage]);

  return (
    <div className="vtdForm">
      <h1>{pipeline?.pipeline}</h1>
      {vtdForm && vtdId && (
        <div
          className="virtualScroll"
          onScroll={virtualOnScroll}
          ref={virtualScrollRef}
          style={{
            // width: countColumnsOnPage * COLUMN_WIDTH + scrollBarWidth,
            height: countRowsOnPage * ROW_HEIGHT + COLUMN_HEIGHT + scrollBarWidth,
          }}
        >
          <div
            style={{
              width: visibleColumnsSum,
              height: vtdForm.rows.length * ROW_HEIGHT + COLUMN_HEIGHT,
            }}
            className="virtualScrollContent"
          >
            <table>
              <thead>
                <tr>
                  {visibleColumns.map((column) => (
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
                {vtdForm.rows.slice(indexRow, indexRow + countRowsOnPage).map((row) => (
                  <tr key={v4()}>
                    {row
                      .filter((_, i) => !vtdForm.columns[i].hidden)
                      .map((cell) => (
                        <td
                          key={v4()}
                          style={{
                            minWidth: COLUMN_WIDTH,
                            maxWidth: COLUMN_WIDTH,
                            height: ROW_HEIGHT,
                          }}
                        >
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
