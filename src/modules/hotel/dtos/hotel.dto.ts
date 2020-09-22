import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

class HotelDto {
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
  provinceId: number;

  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  districtId: number;
}

export class HotelCreateDto extends HotelDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNumber()
  ownerId: number;
}

export class HotelUpdateDto extends HotelDto {}
