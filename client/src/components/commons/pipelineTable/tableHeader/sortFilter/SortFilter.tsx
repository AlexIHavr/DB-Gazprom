import classNames from 'classnames';
import { memo, useCallback, useMemo } from 'react';
import { getDefaultSortedRows, getSortedRows } from 'shared/helpers/pipelineTable';
import { useAppDispatch } from 'hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from 'redux/vtds/reducer';
import { PipelineColumn, TableType, PipelineTable } from 'redux/vtds/types';
import { ReactComponent as ArrowDown } from 'assets/svg/arrowDownSolid.svg';
import { SORT_TYPES } from 'redux/vtds/constants';

import './sortFilter.scss';

type SortFilterProps = {
  vtdId: string;
  table: PipelineTable;
  tableType: TableType;
  column: PipelineColumn;
};

const SortFilter: React.FC<SortFilterProps> = ({ table, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const sortColumnOnMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;

      //remove sortedColumn
      const sortedColumn = table.columns.find(({ sortType }) => sortType !== SORT_TYPES.none);
      if (sortedColumn)
        dispatch(
          setColumnProperties({ tableType, vtdId, columnIndex: sortedColumn.index, properties: { sortType: SORT_TYPES.none } }),
        );

      //sort by column
      const sortType =
        column.sortType === SORT_TYPES.none
          ? SORT_TYPES.asc
          : column.sortType === SORT_TYPES.asc
          ? SORT_TYPES.desc
          : SORT_TYPES.none;
      dispatch(setColumnProperties({ tableType, vtdId, columnIndex: column.index, properties: { sortType } }));

      //set sortedRows
      dispatch(
        setPipelineTableProperties({
          tableType,
          vtdId,
          properties: {
            rows:
              sortType === SORT_TYPES.none
                ? getDefaultSortedRows(table.rows)
                : getSortedRows({
                    sortType,
                    columnIndex: column.index,
                    rows: table.rows,
                  }),
          },
        }),
      );
    },
    [dispatch, tableType, vtdId, column.index, column.sortType, table.columns, table.rows],
  );

  const sortFilterTitle = useMemo(
    () =>
      column.sortType === SORT_TYPES.none
        ? SORT_TYPES.asc
        : column.sortType === SORT_TYPES.asc
        ? SORT_TYPES.desc
        : SORT_TYPES.none,
    [column.sortType],
  );

  return (
    <button
      title={sortFilterTitle}
      className={classNames('sortColumn', {
        upSortColumn: column.sortType === SORT_TYPES.asc,
        isSortedColumn: column.sortType !== SORT_TYPES.none,
      })}
      onMouseDown={sortColumnOnMouseDown}
    >
      <ArrowDown />
    </button>
  );
};

export default memo(SortFilter);
