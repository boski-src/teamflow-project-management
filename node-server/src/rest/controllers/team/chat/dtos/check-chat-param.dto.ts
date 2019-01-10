import { IsNotEmpty, IsString } from 'class-validator';

export class CheckChatParamDto {
  @IsNotEmpty()
  @IsString()
  chatId : string;
}