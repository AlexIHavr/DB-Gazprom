import { Dispatch, RefObject, SetStateAction } from 'react';

import { SelectValues } from './vtdTreeSelect';

export type VtdTreeSelectProps = {
  selectValues: SelectValues;
  setSelectValues: Dispatch<SetStateAction<SelectValues>>;
};

export type FileInputProps = {
  title: string;
  inputName: string;
  isMultiple?: boolean;
};

export type ManageVtdButtonsProps = {
  vtdId?: string;
  formRef: RefObject<HTMLFormElement>;
  selectValues: SelectValues;
};
