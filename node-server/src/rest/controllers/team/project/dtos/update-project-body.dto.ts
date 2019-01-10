import { IsBoolean, IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProjectBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  @MaxLength(1500)
  description : string;
  @IsNotEmpty()
  // @MinDate(new Date())
  @IsDateString()
  deadline : string;
  @IsNotEmpty()
  @IsBoolean()
  finished : boolean;
}