import ClientError from 'shared/errors/ClientError';
import { PipelineColumns } from 'widgets';

import { TABLE_TYPES } from '../consts/tableTypes';
import { TableType } from '../types/pipelineTable';

export const checkRequiredColumns = (columns: PipelineColumns, tableType: TableType) => {
  const requiredColumns = TABLE_TYPES[tableType].requiredColumns;
  const isIncludesRequiredColumns = requiredColumns.every((requiredColumn) =>
    columns.some(({ value }) => value && requiredColumn === String(value)),
  );

  if (!isIncludesRequiredColumns) throw ClientError.InvalidColumns(requiredColumns);
};
