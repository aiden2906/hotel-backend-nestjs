/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable } from '@nestjs/common';
import { AttributeOptionCreateDto } from '../dtos/attribute-option.dto';
import { AddAttributeOptionDto, AttributeUpdateDto, RemoveAttributeOptionDto } from '../dtos/attribute.dto';
import { AttributeRepository } from '../repositories/attribute.repository';
import { AttributeOptionService } from './attribute-option.service';

@Injectable()
export class AttributeService {
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly attributeOptionService: AttributeOptionService,
  ) {}

  async create(args) {
    const {name} = args;
    const existedAttr = await this.attributeRepository.getByName(name);
    if (existedAttr) {
      throw new BadRequestException('attribute already exists');
    }
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

  async update(id: number, args: AttributeUpdateDto) {
    const {name} = args;
    const attr = await this.get(id);
    attr.name = name || attr.name;
    return this.attributeRepository.save(attr);
  }

  async addAttributeOption(id: number, args: AddAttributeOptionDto) {
    const { name } = args;
    const attr = await this.get(id);
    const dto: AttributeOptionCreateDto = {
      name,
      attributeId: attr.id,
    };
    return this.attributeOptionService.create(dto);
  }

  async removeAttributeOption(id: number, args: RemoveAttributeOptionDto) {
    const attr = await this.get(id);
    const option = await this.attributeOptionService.get(args.attributeOpitonId);
    if (attr.id !== option.attributeId) {
      throw new BadRequestException('no permission');
    }
    return this.attributeOptionService.delete(args.attributeOpitonId);
  }

  async delete(id: number) {
    const attr = await this.get(id);
    attr.isDeleted = true;
    return this.attributeRepository.save(attr);
  }
}
