import { ExcelRow, ExcelValue, PipelineColumns, PipelineRows, PipelineTable } from '../redux/vtds/types';

import { getDefaultColumn, getDefaultRow } from './excel';

type GetAddedColumnCellsParams<T> = {
  cells: T;
  index: number;
  value: ExcelRow | string;
};

const getAddedColumnCells = <T extends PipelineColumns | PipelineRows>({ cells, index, value }: GetAddedColumnCellsParams<T>) => {
  const newCells = [];
  let cellIndex = 0;

  for (let i = 0; i < cells.length + 1; i++) {
    if (index === i) {
      newCells.push(typeof value === 'string' ? getDefaultColumn(value, i) : getDefaultRow(value));
      continue;
    }

    index > i ? newCells.push(cells[cellIndex]) : newCells.push({ ...cells[cellIndex], index: i });
    cellIndex++;
  }

  return newCells as T;
};

type getAddedColumnTableParams = {
  pipelineTable: PipelineTable;
  name: string;
  index: number;
  values?: ExcelRow;
};

export const getAddedColumnTable = ({ pipelineTable, name, index, values }: getAddedColumnTableParams): PipelineTable => {
  return {
    columns: getAddedColumnCells({ cells: pipelineTable.columns, index, value: name }),
    rows: getAddedColumnCells({
      cells: pipelineTable.rows,
      index,
      value: values || new Array<ExcelValue>(pipelineTable.columns.length + 1).fill(null),
    }),
  };
};
