import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalBodyDto {
  @IsNotEmpty()
  @IsString()
  firstName : string;
  @IsNotEmpty()
  @IsString()
  lastName : string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email : string;
  @IsNotEmpty()
  @IsString()
  password : string;
}