import { utils, writeFile } from 'xlsx';

import { PipelineData } from '../types/pipelineTable';

export const uploadPipelineTable = (pipelineData: PipelineData, type: string) => {
  const parsedPipelineTable = pipelineData.rows.reduce(
    (prev, { cells }) => {
      prev.push(cells.map(({ value }) => value));
      return prev;
    },
    [pipelineData.columns.map(({ value }) => value)],
  );

  const workBook = utils.book_new();
  const workSheet = utils.aoa_to_sheet(parsedPipelineTable);
  utils.book_append_sheet(workBook, workSheet, type);
  writeFile(workBook, `${type}.xlsx`);
};
