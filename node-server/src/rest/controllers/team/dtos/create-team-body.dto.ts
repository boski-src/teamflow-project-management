import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTeamBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  description : string;
}