import { ExcelRow, ExcelRows, PipelineTable } from '../redux/vtds/types';

import { getDefaultColumn } from './excel';

type GetAddedColumnRowsParams = {
  rows: ExcelRows;
  index: number;
  values?: ExcelRow;
};

const getAddedColumnRows = ({ rows, index, values }: GetAddedColumnRowsParams) => {
  if (!rows.length) return rows;

  return rows.map((row, rowsIndex) => {
    const newRows = [];
    const newRowValue = !values || values[rowsIndex] ? null : values[rowsIndex];
    let rowIndex = 0;

    for (let i = 0; i < row.length + 1; i++) {
      if (index === i) {
        newRows.push(newRowValue);
      } else {
        newRows.push(row[rowIndex]);
        rowIndex++;
      }
    }

    return newRows;
  });
};

type getAddedColumnTableParams = {
  pipelineTable: PipelineTable;
  name: string;
  index: number;
  values?: ExcelRow;
};

export const getAddedColumnTable = ({ pipelineTable, name, index, values }: getAddedColumnTableParams): PipelineTable => {
  const newColumns = [];
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

  return {
    columns: newColumns,
    rows: getAddedColumnRows({ rows: pipelineTable.rows, index, values }),
    filteredRows: getAddedColumnRows({ rows: pipelineTable.filteredRows, index, values }),
    sortedRows: getAddedColumnRows({ rows: pipelineTable.sortedRows, index, values }),
  };
};
