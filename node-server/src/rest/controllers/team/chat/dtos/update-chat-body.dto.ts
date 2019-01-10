import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateChatBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  @MaxLength(1500)
  description : string;
}