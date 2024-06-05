import { ServerError } from 'common/errors/serverError.error';
import { getNameRow } from '@vtdTable/helpers/alias.helper';
import { CreateVtdTableRowsParams } from '@vtdTable/types/params.type';
import { VtdTableRows } from '@vtdTable/types/vtdTable.type';
import { VtdTable } from '@vtdTable/models/vtdTable.model';

import { COLUMN_NAMES } from './modelColumnAliases.const';

export const getCreatedVtdTableRows = async ({
  vtdId,
  vtdTable,
  vtdTableModel,
}: CreateVtdTableRowsParams): Promise<VtdTableRows> => {
  const firstRow = await vtdTableModel.findOne({ where: { vtdId } });
  if (firstRow) throw ServerError.ExistsVtdTable(vtdTableModel.tableName);

  const createdRows: Promise<VtdTable>[] = [];
  const modelAttributes = vtdTableModel.getAttributes();

  // check vtdTable headers exist in model
  Object.keys(vtdTable[0]).forEach((alias) => {
    const key = (COLUMN_NAMES[alias] ?? alias) as keyof typeof modelAttributes;

    if (modelAttributes[key] === undefined) {
      throw ServerError.NotFoundColumn(alias);
    }
  });

  let numberIncrement = 1;

  vtdTable.forEach((row) => {
    const createdRow = vtdTableModel.create({
      ...getNameRow(row),
      vtdId,
      number: numberIncrement,
    });

    createdRows.push(createdRow);

    numberIncrement += 1;
  });

  try {
    return await Promise.all(createdRows);
  } catch (error) {
    vtdTableModel.destroy({ where: { vtdId } });
    throw error;
  }
};
