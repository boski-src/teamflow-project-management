import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAccessParamsDto {
  @IsNotEmpty()
  @IsString()
  teamId : string;
}