import { read, utils } from 'xlsx';
import { ExcelRow, getDefaultPipelineData, PipelineData } from 'widgets';
import ClientError from 'shared/errors/ClientError';

import { SUPPORT_FORMATS } from '../consts/supportFormats';

export const excelRenderer = async (file: File, listNumber: number = 0) => {
  if (!SUPPORT_FORMATS.some((format) => format === file.type)) throw ClientError.InvalidFormat();

  return new Promise<PipelineData>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const workBook = read(e.target?.result, { type: 'binary' });

      const workSheetName = workBook.SheetNames[listNumber];
      const workSheet = workBook.Sheets[workSheetName];

      const excelRows = utils.sheet_to_json<ExcelRow>(workSheet, { header: 1, defval: null });

      resolve(getDefaultPipelineData(excelRows));
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
};
