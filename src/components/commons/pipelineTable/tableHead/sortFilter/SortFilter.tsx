import { ArrowDownward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import classNames from 'classnames';
import { useCallback } from 'react';

import { getSortedRows } from '../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../hooks/redux';
import { SORT_TYPES } from '../../../../../redux/vtdTree/constants';
import { setColumn, setSortedRows } from '../../../../../redux/vtdTree/reducer';
import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../redux/vtdTree/types';

import './sortFilter.scss';

type SortFilterProps = {
  vtdId: string;
  table: PipelineTable;
  tableType: PipelineDataTables;
  column: PipelineColumn;
};

const SortFilter: React.FC<SortFilterProps> = ({ table, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const sortColumnOnClick = useCallback(() => {
    //remove sortedColumn
    const sortedColumn = table.columns.find(({ sortType }) => sortType !== null);
    if (sortedColumn) dispatch(setColumn({ tableType, vtdId, column: { ...sortedColumn, sortType: null } }));

    //sort by column
    const sortType = column.sortType === null ? SORT_TYPES.asc : column.sortType === SORT_TYPES.asc ? SORT_TYPES.desc : null;
    dispatch(setColumn({ tableType, vtdId, column: { ...column, sortType } }));

    //set sortedRows
    dispatch(
      setSortedRows({
        tableType,
        vtdId,
        sortedRows:
          sortType === null ? table.rows : getSortedRows({ sortType, columnIndex: column.index, rows: table.sortedRows }),
      }),
    );
  }, [column, dispatch, table.columns, table.rows, table.sortedRows, tableType, vtdId]);

  return (
    <IconButton
      title="Фильтр сортировки"
      className={classNames('sortColumn', {
        upSortColumn: column.sortType === SORT_TYPES.asc,
        isSortedColumn: column.sortType !== null,
      })}
      onClick={sortColumnOnClick}
    >
      <ArrowDownward />
    </IconButton>
  );
};

export default SortFilter;
