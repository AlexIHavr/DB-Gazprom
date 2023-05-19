import { ServerError } from 'src/common/errors/serverError.error';

import { getNameRow } from '../helpers/alias';
import { VtdTable } from '../models/VtdTable.model';
import { CreateVtdTableRowsParams } from '../types/params';
import { VtdTableRows } from '../types/vtdTable';

import { COLUMN_NAMES } from './modelColumnAliases';

export const getCreatedVtdTableRows = async ({ vtdId, vtdTable, vtdTableModel }: CreateVtdTableRowsParams) => {
  const firstRow = await vtdTableModel.findOne({ where: { vtdId } });
  if (firstRow) throw ServerError.ExistsVtdTable(vtdTableModel.tableName);

  const createdRows: VtdTableRows = [];
  const modelAttributes = vtdTableModel.getAttributes();

  //check vtdTable headers exist in model
  Object.keys(vtdTable[0]).forEach((alias) => {
    if (modelAttributes[COLUMN_NAMES[alias] || alias] === undefined) throw ServerError.NotFoundColumn(alias);
  });

  let numberIncrement = 0;
  for (const row of vtdTable) {
    let createdRow: VtdTable;

    try {
      createdRow = await vtdTableModel.create({ ...getNameRow(row), vtdId, number: ++numberIncrement });
    } catch (error) {
      vtdTableModel.destroy({ where: { vtdId } });
      throw error;
    }

    createdRows.push(createdRow);
  }

  return createdRows;
};
