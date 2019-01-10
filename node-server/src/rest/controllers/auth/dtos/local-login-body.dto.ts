import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalLoginBodyDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email : string;
  @IsNotEmpty()
  @IsString()
  password : string;
}