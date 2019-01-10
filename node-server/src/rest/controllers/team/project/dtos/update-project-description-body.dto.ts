import { IsString, MaxLength } from 'class-validator';

export class UpdateProjectDescriptionBodyDto {
  @IsString()
  @MaxLength(1500)
  description : string;
}