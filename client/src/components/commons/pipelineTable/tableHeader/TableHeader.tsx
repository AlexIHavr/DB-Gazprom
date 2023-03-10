import { memo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from 'hooks/redux';
import { PipelineColumn, TableType, PipelineTable } from 'redux/vtds/types';
import { setColumnProperties } from 'redux/vtds/reducer';
import { ReactComponent as EyeSlashSolid } from 'assets/svg/eyeOffSolid.svg';

import ExtendedFilter from './extendedFilter/ExtendedFilter';
import SortFilter from './sortFilter/SortFilter';

import './tableHeader.scss';

type TableHeaderProps = {
  table: PipelineTable;
  column: PipelineColumn;
  vtdId?: string;
  tableType?: TableType;
  style?: React.CSSProperties;
};

const TableHeader: React.FC<TableHeaderProps> = ({ table, vtdId, tableType, column, style }) => {
  const dispatch = useAppDispatch();
  const tableCellRef = useRef<HTMLTableCellElement>(null);

  const onMouseDownChangeSizeTool = useCallback(
    (e: React.MouseEvent) => {
      if (e.button || !vtdId || !tableType) return;

      const parentElem = (e.target as HTMLDivElement).parentElement;
      let startPageX = e.pageX;
      let width = column.width;

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
          dispatch(setColumnProperties({ vtdId, tableType, columnIndex: column.index, properties: { width } }));
          window.removeEventListener('mousemove', onMouseMove);
        },
        {
          once: true,
        },
      );
    },
    [column.width, column.minWidth, column.index, dispatch, vtdId, tableType],
  );

  const hideColumnOnMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button || !vtdId || !tableType) return;
      dispatch(setColumnProperties({ vtdId, tableType, columnIndex: column.index, properties: { hidden: true } }));
    },
    [dispatch, vtdId, tableType, column.index],
  );

  useEffect(() => {
    const tableCellRefCurrent = tableCellRef.current!;

    tableCellRefCurrent.style.maxWidth = column.width + 'px';
    tableCellRefCurrent.style.minWidth = column.width + 'px';
    tableCellRefCurrent.style.display = column.hidden ? 'none' : 'table-cell';
  }, [column.hidden, column.width]);

  return (
    <th ref={tableCellRef} style={style} className={classNames({ showExtendedFilter: column.extendedFilter.visible })}>
      <span title={column.value ? String(column.value) : ''}>{column.value}</span>

      {vtdId && tableType && (
        <>
          <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>
          <div className="manageColumnButtons">
            <button title="Скрыть колонку" className="hideColumn" onMouseDown={hideColumnOnMouseDown}>
              <EyeSlashSolid />
            </button>
            <ExtendedFilter table={table} vtdId={vtdId} tableType={tableType} column={column} />
            <SortFilter table={table} vtdId={vtdId} tableType={tableType} column={column} />
          </div>
        </>
      )}
    </th>
  );
};

export default memo(TableHeader);