import { IsDate, IsDefined, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRole, USER_ROLE } from '../user.constant';
import { Transform } from 'class-transformer';

export class UserDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  firstname: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  lastname: string;

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

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  dateOfBirth: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  chatId: string;
}

export class UserCreateDto extends UserDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  firstname: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  lastname: string;

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
