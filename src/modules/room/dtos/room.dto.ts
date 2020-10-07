import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RoomAttributeCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  attributeId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  attributeOptionId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  roomId: number;
}

export class AddRoomAttributeDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  attributeId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  attributeOptionId: number;
}

export class RoomCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  hotelId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  stock: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  regularPrice: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  salePrice: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  capacity: number;

  @ApiModelPropertyOptional({
    type: [AddRoomAttributeDto],
  })
  @IsOptional()
  @ValidateNested()
  @IsArray()
  attributes: AddRoomAttributeDto[];

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  images: string[];
}

export class RoomUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  stock: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  regularPrice: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  salePrice: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  capacity: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  images: string[];

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;
}
