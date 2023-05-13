import { IsUUID } from 'class-validator';

export class VtdIdDto {
  @IsUUID(4)
  readonly vtdId: string;
}
