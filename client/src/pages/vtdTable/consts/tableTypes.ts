import { TableType } from '../types/pipelineTable';

export const TABLE_TYPES = {
  form: {
    type: 'form',
    name: 'Форма',
    requiredColumns: ['Номер трубы'],
  },
  repairs: {
    type: 'repairs',
    name: 'Ремонты',
    requiredColumns: ['№ трубы ВТД'],
  },
  inspections: {
    type: 'inspections',
    name: 'Обследования',
    requiredColumns: [],
  },
  statistics: {
    type: 'statistics',
    name: 'Статистика',
    requiredColumns: [],
  },
};

export const TABLE_TYPES_KEYS = Object.keys(TABLE_TYPES) as TableType[];
