import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateProjectFinishedBodyDto {
  @IsNotEmpty()
  @IsBoolean()
  finished : string;
}