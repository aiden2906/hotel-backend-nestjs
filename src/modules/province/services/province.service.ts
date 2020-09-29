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

  async list(query) {
    const {provinceId} = query;
    const queryBuilder = this.districtRepo.createQueryBuilder('district');
    if (provinceId) {
      queryBuilder.andWhere(`district.provinceId = :provinceId`, {provinceId})
    }
    return queryBuilder.getMany();
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

  async list(query) {
    const {districtId} = query;
    const queryBuilder = this.wardRepo.createQueryBuilder('ward');
    if (districtId) {
      queryBuilder.where('ward.districtId = :districtId', {districtId});
    }
    return queryBuilder.getMany();
  }
}
