import { IsEnum } from 'class-validator';

enum TeamRoles {
  Admin,
  Member
}

export class CheckTeamUserRoleQueryDto {
  @IsEnum(TeamRoles)
  role : string;
}