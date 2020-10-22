import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AQuery } from 'src/shared/classes/query.dto';

export class HotelQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => Number(v))
  @IsNumber()
  ownerId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => Number(v))
  @IsNumber()
  provinceId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => Number(v))
  @IsNumber()
  districtId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => Number(v))
  @IsNumber()
  wardId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}
