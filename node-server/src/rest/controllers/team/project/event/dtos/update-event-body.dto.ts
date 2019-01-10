import { IsDateString, IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

class ColorsDTO {
  @IsString()
  @Length(4, 7)
  primary : string;
  @IsString()
  @Length(4, 7)
  secondary : string;
}

export class UpdateEventBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  name : string;
  @IsString()
  description : string;
  @IsNotEmpty()
  // @MinDate(new Date())
  @IsDateString()
  start : Date;
  @IsNotEmpty()
  // @MinDate(new Date())
  @IsDateString()
  end : Date;
  @IsNotEmpty()
  @ValidateNested()
  colors : ColorsDTO;
}