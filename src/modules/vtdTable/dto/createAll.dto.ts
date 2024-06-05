import { VtdIdDto } from 'common/dto/vtdId.dto';
import { CreationAttributes } from 'common/types/utility.type';
import { VtdTable } from '@vtdTable/models/vtdTable.model';

export class CreateAllDto extends VtdIdDto {
  public readonly vtdTable: CreationAttributes<VtdTable>[];
}
