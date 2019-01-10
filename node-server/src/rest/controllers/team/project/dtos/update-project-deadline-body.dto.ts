import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateProjectDeadlineBodyDto {
  @IsNotEmpty()
  // @MinDate(new Date())
  @IsDateString()
  deadline : string;
}