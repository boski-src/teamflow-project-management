import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChatMessageBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(800)
  text : string;
}