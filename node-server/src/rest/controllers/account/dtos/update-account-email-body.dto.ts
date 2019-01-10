import { IsEmail, IsString } from 'class-validator';

export class UpdateAccountEmailBodyDto {
  @IsEmail()
  @IsString()
  newEmail : string;
}