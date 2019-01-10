import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { getRegex } from '../../../../base';

export class CheckTeamIdParamDto {
  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp(getRegex('objectId')))
  teamId : string;
}