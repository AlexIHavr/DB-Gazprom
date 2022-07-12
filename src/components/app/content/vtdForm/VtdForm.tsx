import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAppSelector } from '../../../../hooks/redux';
import TableHeadCell from '../../../commons/tableHeadCell/TableHeadCell';
import { PAGES } from '../../constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const { [PAGES.vtdForm.param]: vtdId } = useParams();

  const [indexRow, setIndexRow] = useState(0);
  const [indexColumn, setIndexColumn] = useState(0);
  const [countRowsOnPage, setCountRowsOnPage] = useState(0);
  const [countColumnsOnPage, setCountColumnsOnPage] = useState(0);

  const pipeline = useMemo(() => vtdTree.find(({ id }) => id === vtdId), [vtdTree, vtdId]);

  const vtdForm = pipeline?.pipelineData.form;

  const virtualScrollRef = useRef<HTMLDivElement>(null);

  const columnWidth = 120;
  const columnHeight = 35;
  const columnHeadHeight = 120;

  useEffect(() => {
    setCountColumnsOnPage(Math.floor(virtualScrollRef.current!.clientWidth / columnWidth));
    setCountRowsOnPage(
      Math.floor((virtualScrollRef.current!.clientHeight - columnHeadHeight) / columnHeight) + 3,
    );
  }, []);

  return (
    <div className="vtdForm">
      <h1>{pipeline?.pipeline}</h1>
      {vtdForm && vtdId && (
        <div
          className="virtualScroll"
          onScroll={(e: React.UIEvent<HTMLDivElement>) => {
            const scrollTop: number = e.currentTarget.scrollTop;
            const scrollLeft: number = e.currentTarget.scrollLeft;

            const pipelineTable = e.currentTarget.firstChild!.firstChild as HTMLDivElement;

            pipelineTable.style.top = scrollTop + 'px';
            pipelineTable.style.left = scrollLeft + 'px';

            setIndexRow(scrollTop / columnHeight);
            setIndexColumn(scrollLeft / columnWidth);
          }}
          ref={virtualScrollRef}
        >
          <TableContainer
            style={{
              width: vtdForm.columns.length * columnWidth,
              height: vtdForm.rows.length * columnHeight + columnHeadHeight,
            }}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {vtdForm.columns
                    .slice(indexColumn, indexColumn + countColumnsOnPage)
                    .map((column) => (
                      <TableHeadCell
                        key={column.id}
                        vtdId={vtdId}
                        tableType="form"
                        column={column}
                        style={{
                          minWidth: columnWidth,
                          maxWidth: columnWidth,
                          height: columnHeadHeight,
                        }}
                      />
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {vtdForm.rows.slice(indexRow, indexRow + countRowsOnPage).map((row) => (
                  <TableRow key={v4()}>
                    {row.slice(indexColumn, indexColumn + countColumnsOnPage).map(
                      (cell, i) =>
                        !vtdForm.columns[i].hidden && (
                          <TableCell
                            key={v4()}
                            style={{
                              minWidth: columnWidth,
                              maxWidth: columnWidth,
                              height: columnHeight,
                            }}
                          >
                            {cell}
                          </TableCell>
                        ),
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default VtdForm;
