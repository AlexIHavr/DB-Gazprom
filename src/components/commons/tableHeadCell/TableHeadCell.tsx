import { TableCell } from '@mui/material';
import { memo, useCallback, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../hooks/redux';
import { setPipelineColumnWidth } from '../../../redux/vtdTree/reducer';
import { PipelineColumn, PipelineDataTables } from '../../../redux/vtdTree/types';

import './tableHeadCell.scss';

type TableHeadCellProps = {
  vtdId: string;
  tableType: PipelineDataTables;
  column: PipelineColumn;
};

const TableHeadCell: React.FC<TableHeadCellProps> = ({ vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();
  const tableCellRef = useRef<HTMLTableCellElement>();

  const onMouseDownChangeSizeTool = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;

      const parentElem = (e.target as HTMLDivElement).parentElement;
      let width: number;

      const onMouseMove = (event: MouseEvent) => {
        if (parentElem && event.pageX) {
          width = event.pageX - parentElem.getBoundingClientRect().left;
          parentElem.style.minWidth = width + 'px';
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener(
        'mouseup',
        () => {
          dispatch(setPipelineColumnWidth({ vtdId, tableType, columnId: column.id, width }));
          window.removeEventListener('mousemove', onMouseMove);
        },
        {
          once: true,
        },
      );
    },
    [dispatch, vtdId, tableType, column.id],
  );

  useEffect(() => {
    if (column.minWidth) tableCellRef.current!.style.minWidth = column.minWidth + 'px';
  }, [column.minWidth]);

  return (
    <TableCell ref={tableCellRef}>
      <span>{column.value}</span>
      <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>
    </TableCell>
  );
};

export default memo(TableHeadCell);
