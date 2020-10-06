import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";

export class RoomQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  hotelId: number;
}
