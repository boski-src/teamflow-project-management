import { IsNotEmpty, IsNumber, IsString, MaxLength, IsDateString, Min, Max } from 'class-validator';

export class CreateTaskBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  @MaxLength(1000)
  description : string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  state : number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  priority : number;
  @IsNotEmpty()
  @IsDateString()
  due : Date;
}