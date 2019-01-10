import { MaxLength } from 'class-validator';

export class CheckProjectListLimitQueryDto {
  @MaxLength(50)
  limit : number;
}