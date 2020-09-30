import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";

export class DistrictQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  provinceId: number;
}

export class WardQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  districtId: number;
}