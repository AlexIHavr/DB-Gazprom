import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ArrowDownward, FilterAlt } from '@mui/icons-material';
import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../../hooks/redux';
import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../redux/vtdTree/types';
import { removeSortedColumn, setColumn, setSortedColumn } from '../../../../redux/vtdTree/reducer';
import { SORT_TYPES } from '../../../../redux/vtdTree/constants';

import './tableHead.scss';

type TableHeadProps = {
  vtdId: string;
  table: PipelineTable;
  tableType: PipelineDataTables;
  column: PipelineColumn;
  style?: React.CSSProperties;
};

const TableHead: React.FC<TableHeadProps> = ({ table, vtdId, tableType, column, style }) => {
  const dispatch = useAppDispatch();
  const tableCellRef = useRef<HTMLTableCellElement>(null);

  const onMouseDownChangeSizeTool = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;

      const parentElem = (e.target as HTMLDivElement).parentElement;
      let startPageX = e.pageX;
      let width: number;

      const onMouseMove = (event: MouseEvent) => {
        if (parentElem) {
          width = parentElem.offsetWidth + event.pageX - startPageX;

          if (width < column.minWidth) width = column.minWidth;

          parentElem.style.maxWidth = width + 'px';
          parentElem.style.minWidth = width + 'px';
          startPageX = event.pageX;
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener(
        'mouseup',
        () => {
          dispatch(setColumn({ vtdId, tableType, column: { ...column, width } }));
          window.removeEventListener('mousemove', onMouseMove);
        },
        {
          once: true,
        },
      );
    },
    [dispatch, vtdId, tableType, column],
  );

  const hideColumnOnClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;

      dispatch(setColumn({ vtdId, tableType, column: { ...column, hidden: true } }));
    },
    [dispatch, vtdId, tableType, column],
  );

  const sortColumnOnClick = useCallback(() => {
    const sortType =
      table.sortedColumn?.id !== column.id
        ? SORT_TYPES.asc
        : table.sortedColumn.sortType === SORT_TYPES.asc
        ? SORT_TYPES.desc
        : null;

    if (!sortType) return dispatch(removeSortedColumn({ vtdId, tableType }));

    dispatch(
      setSortedColumn({
        vtdId,
        tableType,
        column,
        columnIndex: table.columns.findIndex(({ id }) => id === column.id),
        sortType,
      }),
    );
  }, [table.sortedColumn?.id, table.sortedColumn?.sortType, table.columns, column, dispatch, vtdId, tableType]);

  useEffect(() => {
    tableCellRef.current!.style.maxWidth = column.width + 'px';
    tableCellRef.current!.style.minWidth = column.width + 'px';

    tableCellRef.current!.style.display = column.hidden ? 'none' : 'table-cell';
  }, [column]);

  return (
    <th ref={tableCellRef} style={style}>
      <span title={column.value ? String(column.value) : ''}>{column.value}</span>
      <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>
      <IconButton title="Скрыть колонку" className="hideColumn" onClick={hideColumnOnClick}>
        <VisibilityOffIcon />
      </IconButton>
      <IconButton title="Расширенный фильтр" className="filterColumn">
        <FilterAlt />
      </IconButton>
      <IconButton
        title="Фильтр сортировки"
        className={classNames('sortColumn', {
          upSortColumn: table.sortedColumn?.id === column.id && table.sortedColumn.sortType === SORT_TYPES.asc,
          isSortedColumn: table.sortedColumn?.id === column.id,
        })}
        onClick={sortColumnOnClick}
      >
        <ArrowDownward />
      </IconButton>
    </th>
  );
};

export default memo(TableHead);
