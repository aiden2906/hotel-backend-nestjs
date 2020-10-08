import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";

export class ReviewQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform((v) => new Number(v))
  @IsNumber()
  hotelId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform((v) => new Number(v))
  @IsNumber()
  customerId: number;  
}