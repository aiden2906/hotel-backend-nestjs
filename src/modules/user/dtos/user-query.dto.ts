import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { AQuery } from 'src/shared/classes/query.dto';
import { UserRole, USER_ROLE } from '../user.constant';

export class UserQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsIn(USER_ROLE)
  @IsString()
  role: UserRole;
}
