import { ArrowDownward } from '@mui/icons-material';
import classNames from 'classnames';
import { memo, useCallback, useMemo } from 'react';

import { getSortedRows } from '../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from '../../../../../redux/vtdTree/reducer';
import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../redux/vtdTree/types';

import { SORT_TYPES } from './constants';

import './sortFilter.scss';

type SortFilterProps = {
  vtdId: string;
  table: PipelineTable;
  tableType: PipelineDataTables;
  column: PipelineColumn;
};

const SortFilter: React.FC<SortFilterProps> = ({ table, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const sortColumnOnMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;

      //remove sortedColumn
      const sortedColumn = table.columns.find(({ sortType }) => sortType !== null);
      if (sortedColumn)
        dispatch(setColumnProperties({ tableType, vtdId, columnIndex: sortedColumn.index, properties: { sortType: null } }));

      //sort by column
      const sortType = column.sortType === null ? SORT_TYPES.asc : column.sortType === SORT_TYPES.asc ? SORT_TYPES.desc : null;
      dispatch(setColumnProperties({ tableType, vtdId, columnIndex: column.index, properties: { sortType } }));

      //set sortedRows
      dispatch(
        setPipelineTableProperties({
          tableType,
          vtdId,
          properties: {
            sortedRows:
              sortType === null
                ? []
                : getSortedRows({
                    sortType,
                    columnIndex: column.index,
                    rows: table.filteredRows.length ? table.filteredRows : table.rows,
                  }),
          },
        }),
      );
    },
    [dispatch, tableType, vtdId, column.index, column.sortType, table.columns, table.filteredRows, table.rows],
  );

  const sortFilterTitle = useMemo(
    () =>
      column.sortType === null
        ? 'Сортировка по возрастанию'
        : column.sortType === SORT_TYPES.asc
        ? 'Сортировка по убыванию'
        : 'Без сортировки',
    [column.sortType],
  );

  return (
    <button
      title={sortFilterTitle}
      className={classNames('sortColumn', {
        upSortColumn: column.sortType === SORT_TYPES.asc,
        isSortedColumn: column.sortType !== null,
      })}
      onMouseDown={sortColumnOnMouseDown}
    >
      <ArrowDownward />
    </button>
  );
};

export default memo(SortFilter);
