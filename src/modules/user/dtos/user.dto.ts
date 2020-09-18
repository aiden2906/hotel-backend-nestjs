import { IsDefined, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRole, USER_ROLE } from '../user.constant';

export class UserDto {
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

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  email: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  salt: string;

  @ApiModelProperty({
    enum: USER_ROLE
  })
  @IsDefined()
  @IsIn(USER_ROLE)
  role: UserRole;
}

export class UserCreateDto {
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
    enum: USER_ROLE
  })
  @IsOptional()
  @IsIn(USER_ROLE)
  @IsString()
  role: UserRole;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  email: string;
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

export class UserUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  fullname: string;

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
}