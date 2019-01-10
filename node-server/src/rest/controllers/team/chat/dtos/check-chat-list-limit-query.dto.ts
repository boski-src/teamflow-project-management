import { MaxLength } from 'class-validator';

export class CheckChatListLimitQueryDto {
  @MaxLength(50)
  limit : number;
}