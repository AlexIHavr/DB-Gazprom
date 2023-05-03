import { ExcelRows } from 'shared/types/excel';

import { VtdTableResponse } from '../types/vtdTable';

export const vtdTableParse = (vtdTable: VtdTableResponse): ExcelRows => {
  let emptyHeaders: string[] = [];

  const excelRows = vtdTable.reduce<ExcelRows>((previous, vtdRow, i) => {
    delete vtdRow.id;
    delete vtdRow.vtdId;
    delete vtdRow.createdAt;
    delete vtdRow.updatedAt;

    if (!i) {
      emptyHeaders = Object.keys(vtdRow);
      previous.push(emptyHeaders);
    } else {
      const excelRow = Object.values(vtdRow);

      previous.push(excelRow);

      emptyHeaders = emptyHeaders.filter((header) => vtdRow[header] === null);
    }

    return previous;
  }, []);

  const headers = excelRows[0];

  //remove empty columns
  return excelRows.map((excelRow) => {
    return excelRow.filter((_, i) => !emptyHeaders.includes(headers[i] + ''));
  });
};
