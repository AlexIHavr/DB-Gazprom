import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAppSelector } from '../../../../hooks/redux';
import TableHeadCell from '../../../commons/tableHeadCell/TableHeadCell';
import { PAGES } from '../../constants';

import { ROWS_PER_PAGE } from './constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const { [PAGES.vtdForm.param]: vtdId } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);

  const vtdForm = useMemo(
    () => vtdTree.find(({ id }) => id === vtdId)?.pipelineData.form,
    [vtdId, vtdTree],
  );

  const onChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    [],
  );

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(Number(event.target.value));
      setPage(0);
    },
    [],
  );

  return (
    <div className="vtdForm">
      {vtdForm && vtdId && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[...ROWS_PER_PAGE, { label: 'Все', value: -1 }]}
                  count={vtdForm.rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelRowsPerPage="Показывать строк: "
                  showFirstButton
                  showLastButton
                />
              </TableRow>
              <TableRow>
                {vtdForm.columns.map((column) => (
                  <TableHeadCell key={column.id} vtdId={vtdId} tableType="form" column={column} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? vtdForm.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : vtdForm.rows
              ).map((row) => (
                <TableRow key={v4()}>
                  {row.map((cell) => (
                    <TableCell key={v4()}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default VtdForm;
