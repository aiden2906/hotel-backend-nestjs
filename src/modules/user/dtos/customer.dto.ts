import { IsDefined, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CustomerDto {
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
}

export class CustomerCreateDto {
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
}