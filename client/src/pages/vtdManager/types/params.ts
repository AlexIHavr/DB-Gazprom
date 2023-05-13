import { VtdTree } from '../../vtdTree/types/vtdTree';

import { SelectValues } from './vtdTreeSelect';

export type GetVtdTreeChildrenParams = {
  vtdTree: VtdTree;
  selectValues: SelectValues;
  selectIndex: number;
  level?: number;
};
