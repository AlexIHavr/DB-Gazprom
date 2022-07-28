/* eslint-disable no-unused-vars */
export enum SORT_TYPES {
  asc,
  desc,
}

export enum SEARCH_TYPES {
  search = 'Поиск',
  range = 'Поиск в диапазоне',
}

export const SEARCH_TYPES_VALUES = Object.values(SEARCH_TYPES) as [SEARCH_TYPES];
