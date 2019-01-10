import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RebuildPasswordParamsDto {
  @IsNotEmpty()
  userId;
  @IsNotEmpty()
  @IsString()
  @MinLength(32)
  token : string;
}