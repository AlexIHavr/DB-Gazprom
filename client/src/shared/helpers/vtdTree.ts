import { ValueOf } from 'redux/app/types';

export const getUniqueFields = <T extends object>(fieldsArr: T[], uniqueField: keyof T) => {
  const uniqueArr: ValueOf<T>[] = [];

  for (const fields of fieldsArr) {
    if (!uniqueArr.includes(fields[uniqueField])) uniqueArr.push(fields[uniqueField]);
  }

  return uniqueArr;
};
