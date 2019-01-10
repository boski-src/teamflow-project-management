import { IsDateString, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateTaskBodyDto {
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