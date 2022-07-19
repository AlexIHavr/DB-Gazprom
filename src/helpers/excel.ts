import { v4 } from 'uuid';
import { read, utils } from 'xlsx';

import { COLUMN_WIDTH } from '../components/commons/pipelineTable/constants';
import { ExcelRows, PipelineTable } from '../redux/vtdTree/types';

export const excelRenderer = async (file: File, listNumber: number = 0) => {
  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') throw Error('invalid file format');

  return new Promise<PipelineTable>(function (resolve, reject) {
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = function (e) {
      const bstr = e.target?.result;
      const wb = read(bstr, { type: 'binary' });

      const wsName = wb.SheetNames[listNumber];
      const ws = wb.Sheets[wsName];

      const excelRows = utils.sheet_to_json<ExcelRows>(ws, { header: 1 });

      // Fill empty cells
      const countCellInRow = excelRows[0].length;
      const filledExcelRows: ExcelRows = excelRows.map((excelRow) =>
        excelRow.length !== countCellInRow
          ? [...excelRow, ...new Array(countCellInRow - excelRow.length).fill(undefined)]
          : excelRow,
      );

      const data: PipelineTable = {
        sortedColumn: null,
        columns: ['Номер', ...filledExcelRows[0]].map((excelRow) => ({
          id: v4(),
          value: excelRow,
          hidden: false,
          width: COLUMN_WIDTH,
          minWidth: COLUMN_WIDTH,
          sortFilter: null,
          expandedFilter: {},
        })),
        rows: filledExcelRows.slice(1).map((row, i) => [i + 1, ...row]),
      };

      resolve(data);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
};
