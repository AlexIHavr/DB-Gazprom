import { ExcelRows } from 'shared/types/excel';

import { VtdTableResponse } from '../types/vtdTable';

export const vtdTableParse = (vtdTable: VtdTableResponse): ExcelRows => {
  let emptyHeaders: string[] = [];

  const excelRows = vtdTable.reduce<ExcelRows>((previous, vtdRow, i) => {
    if (!i) {
      emptyHeaders = Object.keys(vtdRow);
      previous.push(emptyHeaders);
    }

    previous.push(Object.values(vtdRow));
    emptyHeaders = emptyHeaders.filter((header) => vtdRow[header] === null);

    return previous;
  }, []);

  const headers = excelRows[0];

  //remove empty columns
  return excelRows.map((excelRow) => {
    return excelRow.filter((_, i) => !emptyHeaders.includes(headers[i] + ''));
  });
};
