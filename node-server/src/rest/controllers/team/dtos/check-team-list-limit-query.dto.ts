import { MaxLength } from 'class-validator';

export class CheckTeamListLimitQueryDto {
  @MaxLength(50)
  limit : number;
}