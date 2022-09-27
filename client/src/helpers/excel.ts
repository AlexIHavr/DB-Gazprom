import { v4 } from 'uuid';
import { read, utils, WorkBook } from 'xlsx';

import { COLUMN_WIDTH } from '../components/commons/pipelineTable/constants';
import { REQUIRED_COLUMNS } from '../redux/vtds/constants';
import {
  ExcelRow,
  ExcelValue,
  PipelineCell,
  PipelineColumn,
  PipelineColumns,
  PipelineRow,
  PipelineRows,
  PipelineTable,
  TableType,
} from '../redux/vtds/types';

export const getDefaultColumn = (value: ExcelValue, index: number): PipelineColumn => ({
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
});

export const getDefaultCell = (value: ExcelValue): PipelineCell => ({
  value,
});

export const getDefaultRow = (row: ExcelRow): PipelineRow => ({
  id: v4(),
  hidden: false,
  values: row.map((value) => getDefaultCell(value)),
});

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

      const excelRows = utils.sheet_to_json<ExcelRow>(ws, { header: 1, defval: null });

      const columns: PipelineColumns = ['Номер', ...excelRows[0]].map((value, index) => getDefaultColumn(value, index));

      const rows: PipelineRows = excelRows.slice(1).map((row, i) => getDefaultRow([i + 1, ...row]));

      const data: PipelineTable = { columns, rows };

      resolve(data);
    };

    reader.onerror = () => {
      reject(reader.error);
    };
  });
};

export const checkRequiredColumns = (columns: PipelineColumns, tableType: TableType) => {
  const requiredColumns = REQUIRED_COLUMNS[tableType];
  const isIncludesRequiredColumns = requiredColumns.every((requiredColumn) =>
    columns.some(({ value }) => value && requiredColumn.includes(String(value))),
  );

  if (!isIncludesRequiredColumns) throw Error(`Отсутствуют обязательные колонки: '${requiredColumns.join('; ')}'`);
};
