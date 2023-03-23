import { ExcelRow, PipelineRows } from 'redux/vtds/types';

type getUniqueRowsValuesParams = { rows: PipelineRows; columnIndex: number; maxCount?: number };

export const getUniqueRowsValues = ({ rows, columnIndex, maxCount }: getUniqueRowsValuesParams) => {
  const uniqueRowsValues: ExcelRow = [];

  for (const row of rows) {
    if (maxCount && maxCount <= uniqueRowsValues.length) break;

    const cellValue = row.cells[columnIndex].value;
    if (!uniqueRowsValues.includes(cellValue)) uniqueRowsValues.push(cellValue);
  }

  if (rows.at(-1)?.cells[columnIndex].value === null) {
    if (uniqueRowsValues.at(-1) === null) uniqueRowsValues.pop();
    uniqueRowsValues.unshift(null);
  }

  return uniqueRowsValues;
};
