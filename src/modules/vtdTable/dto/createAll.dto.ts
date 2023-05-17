import { IsUUID } from 'class-validator';
import { CreationAttributes } from 'src/common/types/utility';

import { VtdTable } from '../models/VtdTable.model';

export class CreateAllDto {
  @IsUUID(4)
  readonly vtdId: string;

  readonly vtdTable: CreationAttributes<VtdTable>[];
}
