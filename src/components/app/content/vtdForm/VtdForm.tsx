import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
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
  const { vtdData } = useAppSelector((state) => state.vtdData);

  const { [PAGES.vtdForm.param]: id } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);

  const columns = useMemo(() => ['Номер', ...vtdData[id!].form[0]], [vtdData, id]);

  const rows = useMemo(
    () => vtdData[id!].form.slice(1).map((row, i) => [i + 1, ...row]),
    [vtdData, id],
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeadCell key={column} columnName={column} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={v4()}>
                {row.map((cell) => (
                  <TableCell key={v4()}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[...ROWS_PER_PAGE, { label: 'Все', value: -1 }]}
                count={rows.length}
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
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VtdForm;
