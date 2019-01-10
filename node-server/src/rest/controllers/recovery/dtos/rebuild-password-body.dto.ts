import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RebuildPasswordBodyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword : string;
}