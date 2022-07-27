import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { memo, useCallback, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../../hooks/redux';
import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../redux/vtdTree/types';
import { setColumn } from '../../../../redux/vtdTree/reducer';

import ExtendedFilter from './extendedFilter/ExtendedFilter';
import SortFilter from './sortFilter/SortFilter';

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

  const hideColumnOnClick = useCallback(() => {
    dispatch(setColumn({ vtdId, tableType, column: { ...column, hidden: true } }));
  }, [dispatch, vtdId, tableType, column]);

  useEffect(() => {
    const tableCellRefCurrent = tableCellRef.current;

    if (tableCellRefCurrent) {
      tableCellRefCurrent.style.maxWidth = column.width + 'px';
      tableCellRefCurrent.style.minWidth = column.width + 'px';
      tableCellRefCurrent.style.display = column.hidden ? 'none' : 'table-cell';
    }
  }, [column.hidden, column.width]);

  return (
    <th ref={tableCellRef} style={style}>
      <span title={column.value ? String(column.value) : ''}>{column.value}</span>
      <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>
      <div className="manageColumnButtons">
        <IconButton title="Скрыть колонку" className="hideColumn" onClick={hideColumnOnClick}>
          <VisibilityOffIcon />
        </IconButton>
        <ExtendedFilter table={table} vtdId={vtdId} tableType={tableType} column={column} />
        <SortFilter table={table} vtdId={vtdId} tableType={tableType} column={column} />
      </div>
    </th>
  );
};

export default memo(TableHead);
