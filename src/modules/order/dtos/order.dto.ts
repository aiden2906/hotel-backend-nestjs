import { ApiModelProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsDefined, IsNumber, IsString, ValidateNested } from "class-validator";

export class OrderLineDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  quantity: number;

  @ApiModelProperty()
  @IsDefined()
  @Transform((d) => new Date(d))
  @IsDate()
  start: Date;
  
  @ApiModelProperty()
  @IsDefined()
  @Transform((d) => new Date(d))
  @IsDate()
  end: Date;
  
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  price: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  roomId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  orderId: number;
}

export class OrderCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  fullname: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  hotelId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  email: string;
  
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  phone: string;

  @ApiModelProperty({
    type: [OrderLineDto]
  })
  @IsArray()
  @Type(() => OrderLineDto)
  @IsDefined()
  @ValidateNested()
  orderLines: OrderLineDto[];
}

export class TransactionDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  roomId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  quantity: number;

  @ApiModelProperty()
  @IsDefined()
  @Transform((d) => new Date(d))
  @IsDate()
  day: Date;
}