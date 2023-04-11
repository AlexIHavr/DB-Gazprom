export enum SEARCH_TYPES {
  search = 'Поиск',
  range = 'Поиск в диапазоне',
}

export enum SEARCH_COMPARE_TYPES {
  matchCase = 'Учитывать регистр',
  matchWholeWord = 'Совпадение целого слова',
}

export enum SORT_TYPES {
  asc = 'Сортировка по возрастанию',
  desc = 'Сортировка по убыванию',
  none = 'Без сортировки',
}

export enum RANGE_SEARCH_TYPES {
  from = 'От',
  to = 'До',
}

export const SEARCH_TYPES_VALUES = Object.values(SEARCH_TYPES);
export const SEARCH_COMPARE_TYPES_VALUES = Object.values(SEARCH_COMPARE_TYPES);
