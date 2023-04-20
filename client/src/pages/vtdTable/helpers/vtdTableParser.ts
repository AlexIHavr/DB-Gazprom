import { ExcelRows } from 'shared/types/excel';

import { VtdTableResponse } from '../types/vtdTable';

export const vtdTableParse = (vtdTable: VtdTableResponse): ExcelRows => {
  return vtdTable.reduce<ExcelRows>((previous, vtdRow, i) => {
    delete vtdRow.id;
    delete vtdRow.vtdId;
    delete vtdRow.createdAt;
    delete vtdRow.updatedAt;

    if (!i) previous.push(Object.keys(vtdRow));
    else previous.push(Object.values(vtdRow));

    return previous;
  }, []);
};
