import { PipelineCells, PipelineTable } from '../redux/vtds/types';

import { getDefaultCell, getDefaultColumn } from './excel';

type getAddedColumnTableParams = {
  pipelineTable: PipelineTable;
  name: string;
  index: number;
  values?: PipelineCells;
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

  const newRows = pipelineTable.rows.map((row, rowIndex) => {
    const newValues = [];
    let valueIndex = 0;

    for (let i = 0; i < row.values.length + 1; i++) {
      if (index === i) {
        newValues.push(values ? values[rowIndex] : getDefaultCell(null));
        continue;
      }

      newValues.push(row.values[valueIndex]);

      valueIndex++;
    }

    return { ...row, values: newValues };
  });

  return {
    columns: newColumns,
    rows: newRows,
  };
};
