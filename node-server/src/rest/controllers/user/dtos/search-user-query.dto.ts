import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class SearchUserQueryDto {
  @MaxLength(50)
  limit : number;
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name : string;
}