import { IsNotEmpty, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreateProjectBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  @MaxLength(1500)
  description : string;
  @IsDateString()
  // @MinDate(new Date())
  deadline : string;
}