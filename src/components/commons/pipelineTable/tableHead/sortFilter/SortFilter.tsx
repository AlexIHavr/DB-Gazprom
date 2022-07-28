import { ArrowDownward } from '@mui/icons-material';
import classNames from 'classnames';
import { memo, useCallback } from 'react';

import { getSortedRows } from '../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../hooks/redux';
import { SORT_TYPES } from '../../../../../redux/vtdTree/constants';
import { setColumnProperties, setSortedRows } from '../../../../../redux/vtdTree/reducer';
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
    if (sortedColumn)
      dispatch(setColumnProperties({ tableType, vtdId, columnIndex: sortedColumn.index, properties: { sortType: null } }));

    //sort by column
    const sortType = column.sortType === null ? SORT_TYPES.asc : column.sortType === SORT_TYPES.asc ? SORT_TYPES.desc : null;
    dispatch(setColumnProperties({ tableType, vtdId, columnIndex: column.index, properties: { sortType } }));

    //set sortedRows
    dispatch(
      setSortedRows({
        tableType,
        vtdId,
        sortedRows:
          sortType === null ? table.rows : getSortedRows({ sortType, columnIndex: column.index, rows: table.sortedRows }),
      }),
    );
  }, [column.index, column.sortType, dispatch, table.columns, table.rows, table.sortedRows, tableType, vtdId]);

  return (
    <button
      title="Фильтр сортировки"
      className={classNames('sortColumn', {
        upSortColumn: column.sortType === SORT_TYPES.asc,
        isSortedColumn: column.sortType !== null,
      })}
      onClick={sortColumnOnClick}
    >
      <ArrowDownward />
    </button>
  );
};

export default memo(SortFilter);
