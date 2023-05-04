import { IsUUID } from 'class-validator';
import { VtdTable } from 'src/modules/vtdTable/models/VtdTable.model';
import { CreationAttributes } from 'src/common/types/utility';

export class CreateAllDto {
  @IsUUID(4)
  readonly vtdId: string;

  readonly vtdTable: CreationAttributes<VtdTable>[];
}
