import { Types } from 'mongoose';
import { ArrayMinSize, ArrayNotEmpty, ArrayUnique, IsArray, Matches } from 'class-validator';

import { getRegex } from '../../../../base/utils';

export class UpdateTeamAdminsBodyDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayUnique()
  @Matches(getRegex('objectId'), { each: true })
  admins : Types.ObjectId[];
}