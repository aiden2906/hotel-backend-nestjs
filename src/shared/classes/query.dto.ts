import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform((v) => Number(v))
  @IsNumber()
  page: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform((v) => Number(v))
  @IsNumber()
  perpage: number;
}