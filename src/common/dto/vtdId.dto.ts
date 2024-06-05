import { IsUUID } from 'class-validator';

export class VtdIdDto {
  @IsUUID(4)
  public readonly vtdId: string;
}
