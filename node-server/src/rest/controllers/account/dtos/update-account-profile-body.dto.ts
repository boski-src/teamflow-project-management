import { ArrayMaxSize, IsArray, IsFQDN, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ICommunity {
  @IsString()
  @MaxLength(200)
  platform : string;
  @IsFQDN()
  url : string;
}

class UserProfile {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  fullName : string;
  @IsString()
  @MaxLength(2500)
  about : string;
  @IsString()
  @MaxLength(256)
  title : string;
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested()
  @Type(() => ICommunity)
  community : ICommunity[];
}

export class UpdateAccountProfileBodyDto {
  @ValidateNested()
  profile : UserProfile;
}