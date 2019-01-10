import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAccountPasswordBodyDto {
  @IsNotEmpty()
  @IsString()
  password : string;
}