/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable } from '@nestjs/common';
import { AttributeRepository } from '../repositories/attribute.repository';
import { AttributeOptionService } from './attribute-option.service';

@Injectable()
export class AttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly attributeOptionService: AttributeOptionService,
  ) {}

  async create(args) {
    const attr = await this.attributeRepository.create(args);
    return this.attributeRepository.save(attr);
  }

  async list(query) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.attributeRepository.list(page, perpage);
    return {
      page,
      perpage,
      data,
      total,
    };
  }

  async get(id: number) {
    const attr = await this.attributeRepository.getById(id);
    if (!attr) {
      throw new BadRequestException('not found attribute');
    }
    return attr;
  }
  async update(id: number, args) {
    return '';
  }

  async addAttributeOption(id: number, args) {
    const attr = await this.get(id);
    const dto = {}
  }

  async delete(id: number) {
    const attr = await this.get(id);
    attr.isDeleted = true;
    return this.attributeRepository.save(attr);
  }
}
