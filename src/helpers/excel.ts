import { v4 } from 'uuid';
import { read, utils } from 'xlsx';

import { COLUMN_WIDTH } from '../components/commons/pipelineTable/constants';
import { SEARCH_TYPES } from '../redux/vtdTree/constants';
import { ExcelRows, PipelineColumn, PipelineTable } from '../redux/vtdTree/types';

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

      const columns: PipelineColumn[] = ['Номер', ...filledExcelRows[0]].map((excelRow, index) => ({
        id: v4(),
        index,
        value: excelRow,
        hidden: false,
        width: COLUMN_WIDTH,
        minWidth: COLUMN_WIDTH,
        sortType: null,
        extendedFilter: {
          visible: false,
          searchType: SEARCH_TYPES.search,
        },
      }));

      const rows = filledExcelRows.slice(1).map((row, i) => [i + 1, ...row]);

      const data: PipelineTable = { columns, rows, sortedRows: rows };

      resolve(data);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
};
