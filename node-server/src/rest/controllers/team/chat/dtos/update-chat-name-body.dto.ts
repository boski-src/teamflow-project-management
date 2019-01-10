import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateChatNameBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
}