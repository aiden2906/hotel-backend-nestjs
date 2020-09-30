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

export class HotelUpdateDto extends HotelDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  provinceId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  districtId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;
}


export class AddReviewDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  rating: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  content: string;

  @ApiModelProperty()
  @IsDefined()
  @IsArray()
  images: string[];

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  tagId: number;
}