import { IsNotEmpty, IsString } from 'class-validator';

export class CheckProjectParamDto {
  @IsNotEmpty()
  @IsString()
  projectId : string;
}