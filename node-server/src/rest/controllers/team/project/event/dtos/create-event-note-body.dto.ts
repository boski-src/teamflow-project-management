import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEventNoteBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  body : string;
}