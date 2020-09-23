import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

class HotelDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  address: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  provinceId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  districtId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  images: string[];
}

export class HotelCreateDto extends HotelDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  ownerId: number;
}

export class HotelUpdateDto extends HotelDto {}
