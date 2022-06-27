import { TableCell } from '@mui/material';
import { useCallback } from 'react';

type TableHeadCellProps = {
  columnName: string | number;
};

const TableHeadCell: React.FC<TableHeadCellProps> = ({ columnName }) => {
  const onMouseDownChangeSizeTool = useCallback((e: React.MouseEvent) => {
    if (e.button) return;

    const parentElem = (e.target as HTMLDivElement).parentElement;

    const onMouseMove = (event: MouseEvent) => {
      if (parentElem && event.pageX) {
        parentElem.style.minWidth = event.pageX - parentElem.getBoundingClientRect().left + 'px';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMouseMove), {
      once: true,
    });
  }, []);

  return (
    <TableCell>
      <span>{columnName}</span>
      <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>
    </TableCell>
  );
};

export default TableHeadCell;
