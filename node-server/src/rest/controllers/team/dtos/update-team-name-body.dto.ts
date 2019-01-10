import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateTeamNameBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
}