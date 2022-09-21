import { v4 } from 'uuid';
import { read, utils, WorkBook } from 'xlsx';

import { COLUMN_WIDTH } from '../components/commons/pipelineTable/constants';
import { REQUIRED_COLUMNS } from '../redux/vtds/constants';
import { ExcelRow, ExcelRows, ExcelValue, PipelineColumn, PipelineTable, TableType } from '../redux/vtds/types';

export const getDefaultColumn = (value: ExcelValue, index: number) => {
  return {
    id: v4(),
    index,
    value,
    hidden: false,
    width: COLUMN_WIDTH,
    minWidth: COLUMN_WIDTH,
    sortType: null,
    extendedFilter: {
      visible: false,
      checkedUniqueRowsValues: [],
    },
  };
};

export const excelRenderer = async (file: File, listNumber: number = 0) => {
  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') throw Error('Invalid file format');

  return new Promise<PipelineTable>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const wb: WorkBook = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(read(e.target?.result, { type: 'binary' }));
        }, 100);
      });

      const wsName = wb.SheetNames[listNumber];
      const ws = wb.Sheets[wsName];

      const excelRows = utils.sheet_to_json<ExcelRow>(ws, { header: 1 });

      // Fill empty cells
      const countCellInRow = excelRows[0].length;
      const filledExcelRows: ExcelRows = excelRows.map((excelRow) =>
        excelRow.length !== countCellInRow ? [...excelRow, ...new Array(countCellInRow - excelRow.length).fill(null)] : excelRow,
      );

      const columns: PipelineColumn[] = ['Номер', ...filledExcelRows[0]].map((value, index) => getDefaultColumn(value, index));

      const rows = filledExcelRows.slice(1).map((row, i) => [i + 1, ...row]);

      const data: PipelineTable = { columns, rows, sortedRows: [], filteredRows: [] };

      resolve(data);
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
};

export const checkRequiredColumns = (columns: PipelineColumn[], tableType: TableType) => {
  const requiredColumns = REQUIRED_COLUMNS[tableType];
  const isIncludesRequiredColumns = requiredColumns.every((requiredColumn) =>
    columns.some(({ value }) => value && requiredColumn.includes(String(value))),
  );

  if (!isIncludesRequiredColumns) throw Error(`Отсутствуют обязательные колонки: '${requiredColumns.join('; ')}'`);
};
