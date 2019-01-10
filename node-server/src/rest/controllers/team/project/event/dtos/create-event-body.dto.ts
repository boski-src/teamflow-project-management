import { IsDateString, IsHexColor, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';

class ColorsDTO {
  @IsHexColor()
  primary : string;
  @IsHexColor()
  secondary : string;
}

export class CreateEventBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  @MaxLength(1000)
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