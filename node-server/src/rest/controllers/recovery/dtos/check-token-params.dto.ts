import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CheckTokenParamsDto {
  @IsNotEmpty()
  userId;
  @IsNotEmpty()
  @IsString()
  @MinLength(32)
  token : string;
}