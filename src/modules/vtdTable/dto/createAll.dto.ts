import { VtdIdDto } from 'src/common/dto/vtdId.dto';
import { CreationAttributes } from 'src/common/types/utility';

import { VtdTable } from '../models/VtdTable.model';

export class CreateAllDto extends VtdIdDto {
  readonly vtdTable: CreationAttributes<VtdTable>[];
}
