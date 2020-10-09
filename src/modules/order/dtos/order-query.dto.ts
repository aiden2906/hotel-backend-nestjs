import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNumber, IsOptional } from "class-validator";
import { AQuery } from "src/shared/classes/query.dto";
import { OrderStatus, ORDER_STATUS } from "../order.constant";

export class OrderQueryDto extends AQuery{
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsIn(ORDER_STATUS)
  status: OrderStatus;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  hotelId: number;
}
export class OrderLineQueryDto extends AQuery{}