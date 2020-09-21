import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class HotelCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  address: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  ownerId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  provinceId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  districtId: number;
}