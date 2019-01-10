import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProjectNameBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name : string;
}