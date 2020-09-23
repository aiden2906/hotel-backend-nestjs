import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class RoomCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  hotelId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  ownerId: number;

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
}