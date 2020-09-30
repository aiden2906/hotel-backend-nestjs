import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { AQuery } from 'src/shared/classes/query.dto';

export class HotelQueryDto extends AQuery {
  @ApiModelPropertyOptional()
  @IsOptional()
  @Transform(v => Number(v))
  @IsNumber()
  ownerId: number;
}
