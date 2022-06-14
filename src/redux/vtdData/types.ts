export type ExcelRow = (string | number)[];
export type ExcelRows = ExcelRow[];

export type OneVtdData = {
  form: ExcelRows;
  repairs?: ExcelRows;
  inspections?: ExcelRows;
  statistics?: {};
};

export type InitialState = {
  vtdData: Record<string, OneVtdData>;
};
