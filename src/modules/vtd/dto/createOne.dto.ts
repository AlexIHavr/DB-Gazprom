import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator';

export class CreateOneDto {
  @IsNotEmpty()
  public readonly type: string;

  @IsNotEmpty()
  public readonly pipeline: string;

  @IsNotEmpty()
  @Matches(/^\d+-\d+$/g)
  public readonly section: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(4)
  public readonly year: string;
}
