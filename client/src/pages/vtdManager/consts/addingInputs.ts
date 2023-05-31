export const FILE_INPUTS = {
  report: {
    name: 'Отчет ВТД',
    isMultiple: true,
    headerRow: 2,
  },
  joining: {
    name: 'Стыковка труб',
    headerRow: 0,
  },
} as const;

export const ADDING_INPUTS = {
  deletingTable: {
    name: 'Таблица для удаления',
  },
} as const;

export const FILE_INPUTS_KEYS = Object.values(FILE_INPUTS);
