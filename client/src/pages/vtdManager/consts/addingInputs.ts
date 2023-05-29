export const FILE_INPUTS = {
  report: {
    name: 'Отчет ВТД',
    isMultiple: true,
  },
  joining: {
    name: 'Стыковка труб',
  },
} as const;

export const ADDING_INPUTS = {
  deletingTable: {
    name: 'Таблица для удаления',
  },
} as const;

export const FILE_INPUTS_KEYS = Object.values(FILE_INPUTS);
