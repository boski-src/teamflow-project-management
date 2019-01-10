import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskNoteBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  body : string;
}