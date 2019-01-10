import { IsString, MaxLength } from 'class-validator';

export class UpdateTeamDescriptionBodyDto {
  @IsString()
  @MaxLength(2000)
  description : string;
}