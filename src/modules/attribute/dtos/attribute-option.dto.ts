import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class AttributeOptionCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  attributeId: number;
}

export class AttributeOptionUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}