import { IsDefined, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRole, USER_ROLE } from '../user.constant';

export class UserDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  fullname: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  password: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  avatar: string;
}

export class UserCreateDto extends UserDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  fullname: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  username: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  password: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  phone: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  address: string;

  @ApiModelPropertyOptional({
    enum: USER_ROLE,
  })
  @IsOptional()
  @IsIn(USER_ROLE)
  @IsString()
  role: UserRole;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  email: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  salt: string;
}

export class LoginDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  username: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  password: string;
}

export class UserUpdateDto extends UserDto {}
