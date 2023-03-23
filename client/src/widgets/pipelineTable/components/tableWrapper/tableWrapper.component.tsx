import { CSSProperties, FC, memo } from 'react';
import { PipelineColumns, PipelineRows, PipelineTableProps } from 'redux/vtds/types';

import TableHeader from '../tableHeader/tableHeader.component';
import TableRow from '../tableRow/tableRow.component';

import './tableWrapper.styles.scss';

type TableWrapperProps = PipelineTableProps & {
  columnsOnPage: PipelineColumns;
  rowsOnPage: PipelineRows;
  style?: CSSProperties;
};

const TableWrapper: FC<TableWrapperProps> = ({ table, vtdId, tableType, columnsOnPage, rowsOnPage, style }) => {
  return (
    <table style={style}>
      <thead>
        <tr>
          {columnsOnPage.map((column) => (
            <TableHeader key={column.id} table={table} vtdId={vtdId} tableType={tableType} column={column} />
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
