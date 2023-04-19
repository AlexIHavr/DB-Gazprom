import { CreationAttributes } from 'src/common/types/utility';
import { Vtd } from '../models/vtd.model';

export class CreateAllDto {
  readonly vtds: CreationAttributes<Vtd>[];
}
