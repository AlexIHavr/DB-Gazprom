import { IsNotEmpty, IsNumberString } from 'class-validator';
import { VtdIdDto } from 'common/dto/vtdId.dto';

export class CreateDto extends VtdIdDto {
  @IsNotEmpty()
  @IsNumberString()
  public readonly startKm: string;
}
