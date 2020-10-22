import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";

export class DistrictQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Number(v))
  @IsNumber()
  provinceId: number;
}

export class WardQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Number(v))
  @IsNumber()
  districtId: number;
}