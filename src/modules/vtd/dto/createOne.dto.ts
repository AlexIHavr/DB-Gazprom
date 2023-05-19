import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator';

export class CreateOneDto {
  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  readonly pipeline: string;

  @IsNotEmpty()
  @Matches(/^\d+-\d+$/g)
  readonly section: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(4)
  readonly year: string;
}
