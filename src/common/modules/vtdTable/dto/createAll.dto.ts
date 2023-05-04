import { IsUUID } from 'class-validator';
import { VtdTableDtoRow } from '../types/vtdTable';

export class CreateAllDto {
  @IsUUID(4)
  readonly vtdId: string;

  readonly vtdTable: VtdTableDtoRow[];
}
