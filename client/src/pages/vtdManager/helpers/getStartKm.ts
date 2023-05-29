import { Vtd } from '../../vtdTree/types/vtds';

export const getStartKm = (vtd: Vtd) => {
  return vtd.section.split('-')[0];
};
