import { Dispatch, SetStateAction } from 'react';

import { SelectValues } from './vtdTreeSelect';

export type VtdTreeSelectProps = {
  selectValues: SelectValues;
  setSelectValues: Dispatch<SetStateAction<SelectValues>>;
};
