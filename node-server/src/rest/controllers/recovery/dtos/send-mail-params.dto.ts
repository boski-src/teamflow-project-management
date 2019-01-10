import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendMailParamsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email : string;
}