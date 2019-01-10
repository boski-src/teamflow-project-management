import { IsString, MaxLength } from 'class-validator';

export class UpdateChatDescriptionBodyDto {
  @IsString()
  @MaxLength(1500)
  description : string;
}