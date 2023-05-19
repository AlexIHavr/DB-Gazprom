import { IsNotEmpty, IsNumberString } from 'class-validator';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';

export class CreateDto extends VtdIdDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly startKm: string;
}
