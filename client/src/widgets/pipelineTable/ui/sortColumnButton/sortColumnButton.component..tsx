import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import usePipelineTableStore from '../../pipelineTable.store';
import { ReactComponent as ArrowDown } from '../../assets/svg/arrowDownSolid.svg';
import { getDefaultSortedRows, getSortedRows } from '../../helpers/sortRows';
import { SortColumnButtonProps } from '../../types/props';
import { SORT_TYPES } from '../../consts/searchSettings';

import styles from './sortColumnButton.module.scss';

const SortColumnButton: FC<SortColumnButtonProps> = ({ table, index, sortType }) => {
  const [setColumnProperties, setPipelineTableRows] = usePipelineTableStore((state) => [
    state.setColumnProperties,
    state.setPipelineTableRows,
  ]);

  const columnSortType = useMemo(
    () => (sortType === SORT_TYPES.none ? SORT_TYPES.asc : sortType === SORT_TYPES.asc ? SORT_TYPES.desc : SORT_TYPES.none),
    [sortType],
  );

  const sortColumnOnMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button) return;

      //remove sortedColumn
      const sortedColumn = table.columns.find(({ sortType }) => sortType !== SORT_TYPES.none);
      if (sortedColumn) {
        setColumnProperties({
          vtdId: table.vtdId,
          type: table.type,
          index: sortedColumn.index,
          properties: { sortType: SORT_TYPES.none },
        });
      }

      //change sortedColumn
      setColumnProperties({ vtdId: table.vtdId, type: table.type, index, properties: { sortType: columnSortType } });

      //set sortedRows
      setPipelineTableRows({
        vtdId: table.vtdId,
        type: table.type,
        rows:
          columnSortType === SORT_TYPES.none
            ? getDefaultSortedRows(table.rows)
            : getSortedRows({ sortType: columnSortType, index, rows: table.rows }),
      });
    },
    [table.columns, table.vtdId, table.type, table.rows, setColumnProperties, index, columnSortType, setPipelineTableRows],
  );

  return (
    <button
      title={sortType}
      className={classNames(styles.sortColumnButton, {
        [styles.upSortColumn]: sortType === SORT_TYPES.asc,
        [styles.isSortedColumn]: sortType !== SORT_TYPES.none,
      })}
      onMouseDown={sortColumnOnMouseDown}
    >
      <ArrowDown />
    </button>
  );
};

export default memo(SortColumnButton);
