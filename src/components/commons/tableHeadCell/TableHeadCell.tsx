import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { memo, useCallback, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../hooks/redux';
import { PipelineColumn, PipelineDataTables } from '../../../redux/vtdTree/types';
import { setColumn } from '../../../redux/vtdTree/reducer';

import './tableHeadCell.scss';

type TableHeadCellProps = {
  vtdId: string;
  tableType: PipelineDataTables;
  column: PipelineColumn;
  style?: React.CSSProperties;
};

const TableHeadCell: React.FC<TableHeadCellProps> = ({ vtdId, tableType, column, style }) => {
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

  const onMouseDownHideColumn = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;

      dispatch(setColumn({ vtdId, tableType, column: { ...column, hidden: true } }));
    },
    [dispatch, vtdId, tableType, column],
  );

  useEffect(() => {
    tableCellRef.current!.style.maxWidth = column.width + 'px';
    tableCellRef.current!.style.minWidth = column.width + 'px';

    tableCellRef.current!.style.display = column.hidden ? 'none' : 'table-cell';
  }, [column]);

  return (
    <th ref={tableCellRef} style={style}>
      <span>{column.value}</span>
      <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>
      <div className="hideColumn" onMouseDown={onMouseDownHideColumn}>
        <IconButton>
          <VisibilityOffIcon />
        </IconButton>
      </div>
    </th>
  );
};

export default memo(TableHeadCell);
