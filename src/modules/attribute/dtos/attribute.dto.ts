import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class AttributeCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;
}
export class AttributeUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}

export class AddAttributeOptionDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class RemoveAttributeOptionDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  attributeOpitonId: number;
}