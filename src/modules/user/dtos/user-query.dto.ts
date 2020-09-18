import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UserQueryDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  page: number;
  
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  perpage: number;
}