import { FC, memo } from 'react';

import { TableWrapperProps } from '../../types/props';
import TableHeader from '../tableHeader/tableHeader.component';
import TableRow from '../tableRow/tableRow.component';

import './tableWrapper.styles.scss';

const TableWrapper: FC<TableWrapperProps> = ({ table, columnsOnPage, rowsOnPage, style }) => {
  return (
    <table style={style}>
      <thead>
        <tr>
          {columnsOnPage.map((column) => (
            <TableHeader key={column.id} table={table} column={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsOnPage.map(({ id, cells }) => (
          <TableRow key={id} cells={cells} columnsOnPage={columnsOnPage} />
        ))}
      </tbody>
    </table>
  );
};

export default memo(TableWrapper);
