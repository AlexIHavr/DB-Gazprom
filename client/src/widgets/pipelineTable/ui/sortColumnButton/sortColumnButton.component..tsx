import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from 'hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from 'redux/vtds/reducer';
import { PipelineTableColumnProps } from 'redux/vtds/types';
import { SORT_TYPES } from 'redux/vtds/constants';

import { ReactComponent as ArrowDown } from '../../assets/svg/arrowDownSolid.svg';
import { getDefaultSortedRows, getSortedRows } from '../../helpers/sortRows';

import './sortColumnButton.styles.scss';

const SortColumnButton: FC<PipelineTableColumnProps> = ({ table, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const sortType = useMemo(
    () =>
      column.sortType === SORT_TYPES.none
        ? SORT_TYPES.asc
        : column.sortType === SORT_TYPES.asc
        ? SORT_TYPES.desc
        : SORT_TYPES.none,
    [column.sortType],
  );

  const sortColumnOnMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button) return;

      //remove sortedColumn
      const sortedColumn = table.columns.find(({ sortType }) => sortType !== SORT_TYPES.none);
      if (sortedColumn)
        dispatch(
          setColumnProperties({ tableType, vtdId, columnIndex: sortedColumn.index, properties: { sortType: SORT_TYPES.none } }),
        );

      //change sortedColumn
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
    [table.columns, table.rows, dispatch, tableType, vtdId, column.index, sortType],
  );

  return (
    <button
      title={sortType}
      className={classNames('sortColumnButton', {
        upSortColumn: column.sortType === SORT_TYPES.asc,
        isSortedColumn: column.sortType !== SORT_TYPES.none,
      })}
      onMouseDown={sortColumnOnMouseDown}
    >
      <ArrowDown />
    </button>
  );
};

export default memo(SortColumnButton);
