import { ExcelRow, PipelineTable, PipelineColumn, PipelineCells } from 'redux/vtds/types';

import { getDefaultCell, getDefaultColumn } from './excel';

type getAddedColumnTableParams = {
  pipelineTable: PipelineTable;
  name: string;
  index: number;
  values?: ExcelRow;
};

export const getAddedColumnTable = ({ pipelineTable, name, index, values }: getAddedColumnTableParams): PipelineTable => {
  const newColumns: PipelineColumn[] = [];
  let columnIndex = 0;

  for (let i = 0; i < pipelineTable.columns.length + 1; i++) {
    if (index === i) {
      newColumns.push(getDefaultColumn(name, i));
      continue;
    }

    index > i
      ? newColumns.push(pipelineTable.columns[columnIndex])
      : newColumns.push({ ...pipelineTable.columns[columnIndex], index: i });

    columnIndex++;
  }

  const newRows = pipelineTable.rows.map((row, rowIndex) => {
    const cells: PipelineCells = [];
    let cellIndex = 0;

    for (let i = 0; i < row.cells.length + 1; i++) {
      if (index === i) {
        cells.push(getDefaultCell(values ? values[rowIndex] : null));
        continue;
      }

      cells.push(row.cells[cellIndex]);

      cellIndex++;
    }

    return { ...row, cells };
  });

  return {
    columns: newColumns,
    rows: newRows,
  };
};
