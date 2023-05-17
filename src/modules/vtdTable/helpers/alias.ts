import { CreationAttributes } from 'src/common/types/utility';

import { COLUMN_ALIASES, COLUMN_NAMES } from '../consts/modelColumnAliases';
import { VtdTable } from '../models/VtdTable.model';
import { ColumnAliasesKeys } from '../types/alias';

export const getAliasRows = <M extends VtdTable>(rows: M[]) => {
  return rows.map((row) => {
    const aliasRow = {} as M;

    for (const header in row.dataValues) {
      const name = header as ColumnAliasesKeys;

      if (COLUMN_ALIASES[name]) {
        aliasRow[COLUMN_ALIASES[name].alias] = row[name];
        continue;
      }

      aliasRow[name] = row[name];
    }

    return aliasRow;
  });
};

export const getNameRow = <M extends CreationAttributes<VtdTable>>(aliasRow: M) => {
  const nameRow = {} as M;

  for (const alias in aliasRow) {
    if (COLUMN_NAMES[alias]) {
      nameRow[COLUMN_NAMES[alias]] = aliasRow[alias];
      continue;
    }

    nameRow[alias] = aliasRow[alias];
  }

  return nameRow;
};
