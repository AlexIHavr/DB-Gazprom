import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateOneDto {
  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly pipeline: string;

  @IsNotEmpty()
  readonly section: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly year: string;
}
