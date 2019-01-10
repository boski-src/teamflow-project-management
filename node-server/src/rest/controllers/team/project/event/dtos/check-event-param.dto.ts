import { IsNotEmpty, IsString } from 'class-validator';

export class CheckEventParamDto {
  @IsNotEmpty()
  @IsString()
  eventId : string;
}