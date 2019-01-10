import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateAccountAvatarBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000000)
  avatar : string;
}