import { CreationAttributes } from 'common/types/utility.type';
import { COLUMN_ALIASES, COLUMN_NAMES } from '@vtdTable/consts/modelColumnAliases.const';
import { VtdTable } from '@vtdTable/models/vtdTable.model';
import { ColumnAliasesKeys } from '@vtdTable/types/alias.type';

export const getAliasRows = <M extends VtdTable>(rows: M[]): M[] => {
  return rows.map((row) => {
    const aliasRow = {} as M;

    Object.keys(row.dataValues).forEach((header) => {
      const name = header as ColumnAliasesKeys;
      const key = (COLUMN_ALIASES[name]?.alias ?? name) as keyof M;

      aliasRow[key] = row.dataValues[name as keyof object];
    });

    return aliasRow;
  });
};

export const getNameRow = <M extends CreationAttributes<VtdTable>>(aliasRow: M): M => {
  const nameRow = {} as M;

  Object.keys(aliasRow).forEach((alias) => {
    const key = (COLUMN_NAMES[alias] ?? alias) as keyof M;

    nameRow[key] = aliasRow[alias as keyof M];
  });

  return nameRow;
};
