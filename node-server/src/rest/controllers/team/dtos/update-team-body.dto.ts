import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateTeamBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
  @IsString()
  @MaxLength(2000)
  description : string;
}