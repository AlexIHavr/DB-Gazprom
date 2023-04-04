import { GetUniqueRowsValuesParams } from '../types/params';
import { ExcelRow } from '../types/pipelineTable';

export const getUniqueRowsValues = ({ rows, index, maxCount }: GetUniqueRowsValuesParams) => {
  const uniqueRowsValues: ExcelRow = [];

  for (const row of rows) {
    if (maxCount && maxCount <= uniqueRowsValues.length) break;

    const cellValue = row.cells[index].value;
    if (!uniqueRowsValues.includes(cellValue)) uniqueRowsValues.push(cellValue);
  }

  if (rows.at(-1)?.cells[index].value === null) {
    if (uniqueRowsValues.at(-1) === null) uniqueRowsValues.pop();
    uniqueRowsValues.unshift(null);
  }

  return uniqueRowsValues;
};
