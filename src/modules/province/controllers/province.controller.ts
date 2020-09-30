/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Query } from "@nestjs/common";
import { DistrictQueryDto, WardQueryDto } from "../dtos/province.dto";
import { DistrictService, ProvinceService, WardService } from "../services/province.service";

@Controller('api.province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  @Get()
  async list() {
    return this.provinceService.list();
  }
}

@Controller('api.district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}
  @Get()
  async list(@Query() query: DistrictQueryDto) {
    return this.districtService.list(query);
  }
}

@Controller('api.ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}
  @Get()
  async list(@Query() query: WardQueryDto) {
    return this.wardService.list(query);
  }
}

