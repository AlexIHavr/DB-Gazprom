import { read, utils } from 'xlsx';

import { ExcelRow, ExcelRows } from '../redux/vtdData/types';

export const excelRenderer = async (file: File, listNumber: number = 0) => {
  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    throw Error('invalid file format');

  return new Promise<ExcelRows>(function (resolve, reject) {
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = function (e) {
      /* Parse data */
      const bstr = e.target?.result;
      const wb = read(bstr, { type: 'binary' });

      /* Get worksheet by listNumber*/
      const wsName = wb.SheetNames[listNumber];
      const ws = wb.Sheets[wsName];

      /* Convert array of arrays */
      const rows = utils.sheet_to_json<ExcelRow>(ws, { header: 1 });

      const data = rows;
      resolve(data);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
};
