import { FC, memo, useMemo } from 'react';
import { v4 } from 'uuid';

import { TableRowProps } from '../../types/props';
import { COLUMN_WIDTH, ROW_HEIGHT } from '../../consts/tableSettings';

import styles from './tableRow.module.scss';

const TableRow: FC<TableRowProps> = ({ cells, columnsOnPage }) => {
  const rowStyle = useMemo(
    () => ({
      minWidth: COLUMN_WIDTH,
      maxWidth: COLUMN_WIDTH,
      height: ROW_HEIGHT,
    }),
    [],
  );

  return (
    <tr>
      {cells
        .filter((_, i) => columnsOnPage.find(({ index }) => i === index))
        .map((cell) => (
          <td key={v4()} className={styles.tableCell} style={rowStyle} title={cell.value ? String(cell.value) : ''}>
            {cell.value}
          </td>
        ))}
    </tr>
  );
};

export default memo(TableRow);
