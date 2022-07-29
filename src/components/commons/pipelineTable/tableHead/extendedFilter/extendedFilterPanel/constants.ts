/* eslint-disable no-unused-vars */
export enum SEARCH_TYPES {
  search = 'Поиск',
  range = 'Поиск в диапазоне',
}

export const SEARCH_TYPES_VALUES = Object.values(SEARCH_TYPES);

export enum SEARCH_COMPARE_TYPES {
  withRegistry = 'Учитывать регистр',
  wholeWord = 'Полное совпадение',
}

export const SEARCH_COMPARE_TYPES_VALUES = Object.values(SEARCH_COMPARE_TYPES);
