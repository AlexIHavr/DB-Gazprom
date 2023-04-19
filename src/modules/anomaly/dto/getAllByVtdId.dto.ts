import { IsUUID } from 'class-validator';

export class GetAllByVtdIdDto {
  @IsUUID(4)
  readonly vtdId: string;
}
