import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { getRegex } from '../../../../base/utils';

export class CheckUserParamDto {
  @IsNotEmpty()
  @IsString()
  @Matches(getRegex('objectId'))
  userId : string;
}