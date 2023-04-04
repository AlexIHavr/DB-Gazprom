import { FC, memo, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';

import { COLUMN_WIDTH, COLUMN_HEIGHT } from '../../consts/tableSettings';
import ExtendedFilterWrapper from '../extendedFilterWrapper/extendedFilterWrapper.component';
import SortColumnButton from '../../ui/sortColumnButton/sortColumnButton.component.';
import HideColumnButton from '../../ui/hideColumnButton/hideColumnButton.component';
import ChangeSizeTool from '../../ui/changeSizeTool/changeSizeTool.component';
import { TableHeaderProps } from '../../types/props';

import './tableHeader.styles.scss';

const TableHeader: FC<TableHeaderProps> = ({ table, column }) => {
  const tableCellRef = useRef<HTMLTableCellElement>(null);

  const columnStyle = useMemo(() => ({ minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH, height: COLUMN_HEIGHT }), []);
  const headerTitle = useMemo(() => (column.value ? String(column.value) : ''), [column.value]);

  useEffect(() => {
    const tableCellRefCurrent = tableCellRef.current!;

    tableCellRefCurrent.style.maxWidth = column.width + 'px';
    tableCellRefCurrent.style.minWidth = column.width + 'px';
    tableCellRefCurrent.style.display = column.hidden ? 'none' : 'table-cell';
  }, [column.hidden, column.width]);

  return (
    <th ref={tableCellRef} style={columnStyle} className={classNames({ showExtendedFilter: column.extendedFilter.visible })}>
      <span title={headerTitle}>{column.value}</span>
      <ChangeSizeTool
        vtdId={table.vtdId}
        type={table.type}
        index={column.index}
        minWidth={column.minWidth}
        width={column.width}
      />
      <div className="manageColumnButtons">
        <HideColumnButton vtdId={table.vtdId} type={table.type} index={column.index} />
        <ExtendedFilterWrapper table={table} index={column.index} extendedFilter={column.extendedFilter} />
        <SortColumnButton table={table} index={column.index} sortType={column.sortType} />
      </div>
    </th>
  );
};

export default memo(TableHeader);
