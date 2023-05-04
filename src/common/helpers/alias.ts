import { COLUMN_ALIASES, COLUMN_NAMES } from '../consts/modelColumnAliases';
import { ColumnAliasesKeys, ColumnNames } from '../types/alias';
import { VtdTable } from '../models/VtdTable.model';
import { VtdTableDtoRow } from '../modules/vtdTable/types/vtdTable';

export const getColumnNames = () => {
  return Object.values(COLUMN_ALIASES).reduce<ColumnNames>((prev, columnAlias) => {
    prev[columnAlias.alias] = columnAlias.name;
    return prev;
  }, {});
};

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

export const getNameRow = <M extends VtdTableDtoRow>(aliasRow: M) => {
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
