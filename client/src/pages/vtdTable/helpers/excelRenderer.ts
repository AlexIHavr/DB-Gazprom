import { read, utils, WorkBook } from 'xlsx';
import { ExcelRow, getDefaultPipelineData, PipelineData } from 'widgets';

import { SUPPORT_FORMATS } from '../consts/supportFormats';

export const excelRenderer = async (file: File, listNumber: number = 0) => {
  if (!SUPPORT_FORMATS.some((format) => format === file.type)) throw Error('Invalid file format');

  return new Promise<PipelineData>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const wb: WorkBook = await new Promise((resolve) => {
        setTimeout(() => resolve(read(e.target?.result, { type: 'binary' })), 100);
      });

      const wsName = wb.SheetNames[listNumber];
      const ws = wb.Sheets[wsName];

      const excelRows = utils.sheet_to_json<ExcelRow>(ws, { header: 1, defval: null });

      resolve(getDefaultPipelineData(excelRows));
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
};
