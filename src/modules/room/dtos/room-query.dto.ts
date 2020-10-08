import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";

export class RoomQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Number(v))
  @IsNumber()
  hotelId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Number(v))
  @IsNumber()
  attributeId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Number(v))
  @IsNumber()
  attributeOptionId: number;
}

export class RoomTransactionQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Date(v))
  @IsDate()
  start: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => new Date(v))
  @IsDate()
  end: Date;
}
