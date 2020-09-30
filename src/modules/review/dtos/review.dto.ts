import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class ReviewCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  customerId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  tagId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  hotelId: number;

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
}

export class ReviewUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  rating: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  content: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  images: string[];
}