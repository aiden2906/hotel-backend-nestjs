import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";

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

export class AttributeOptionQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Number(v))
  @IsNumber()
  attributeId: number;
}