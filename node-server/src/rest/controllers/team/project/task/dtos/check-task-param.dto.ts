import { IsNotEmpty, IsString } from 'class-validator';

export class CheckTaskParamDto {
  @IsNotEmpty()
  @IsString()
  taskId : string;
}