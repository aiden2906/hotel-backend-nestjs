/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../models/district.entity';
import { Province } from '../models/province.entity';
import { Ward } from '../models/ward.entity';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
  ) {}

  async get(id: number) {
    return this.provinceRepo.findOne({
      where: {
        id,
      },
    });
  }

  async list() {
    return this.provinceRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }
}


@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {}

  async get(id: number) {
    return this.districtRepo.findOne({
      where: {
        id,
      },
    });
  }

  async list() {
    return this.districtRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }
}

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepo: Repository<Ward>,
  ) {}

  async get(id: number) {
    return this.wardRepo.findOne({
      where: {
        id,
      },
    });
  }

  async list() {
    return this.wardRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }
}
