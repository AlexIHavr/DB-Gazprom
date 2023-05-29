import { read, utils, WorkBook } from 'xlsx';
import { ExcelRow, ExcelRows } from 'shared/types/excel';
import ClientError from 'shared/errors/ClientError';

import { SUPPORT_FORMATS } from '../consts/supportFormats';
import { VtdRow, VtdTable } from '../types/vtdTable';
import { HEADER_ROW } from '../consts/excelSettings';

export const excelParse = async (file: File, fileName: string): Promise<VtdTable> => {
  if (!SUPPORT_FORMATS.some((format) => format === file.type)) throw ClientError.InvalidFileFormat();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const workBook: WorkBook = await new Promise((resolve) =>
        setTimeout(() => resolve(read(e.target?.result, { type: 'binary' }))),
      );

      const workSheetName = workBook.SheetNames.find((sheetName) => sheetName === fileName);

      if (!workSheetName) throw ClientError.WorkSheetNotFound(fileName);

      const workSheet = workBook.Sheets[workSheetName];
      const excelRows = utils.sheet_to_json<ExcelRow>(workSheet, { header: 1, defval: null }).slice(HEADER_ROW - 2);

      try {
        const parsedExcelRows = excelRowsParse(excelRows, file.name);

        resolve(parsedExcelRows);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
};

const excelRowsParse = (excelRows: ExcelRows, fileName: string): VtdTable => {
  const headers = excelRows[0];
  const duplicatedHeaders: ExcelRow = [];

  headers.reduce<ExcelRow>((previous, header) => {
    if (previous.includes(header)) duplicatedHeaders.push(header);
    else previous.push(header);

    return previous;
  }, []);

  if (duplicatedHeaders.length) throw ClientError.DuplicatedHeaders(duplicatedHeaders, fileName);

  return excelRows.slice(1).map((excelRow) => {
    return headers.reduce<VtdRow>((previous, header, i) => {
      if (header) previous[header] = excelRow[i];
      return previous;
    }, {});
  });
};
