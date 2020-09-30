import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class TagCreateDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  name: string;
}

export class TagUpdateDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}