/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AttributeOptionCreateDto, AttributeOptionQueryDto, AttributeOptionUpdateDto } from "../dtos/attribute-option.dto";
import { AttributeOptionRepository } from "../repositories/attribute-option.repository";

@Injectable()
export class AttributeOptionService {
  constructor(private readonly attributeOptionRepository: AttributeOptionRepository) {}

  async create(args: AttributeOptionCreateDto) {
    const {name, attributeId} = args;
    const existedOption = await this.attributeOptionRepository.getByName(name, attributeId);
    if (existedOption) {
      throw new BadRequestException('option already exists');
    }
    const option = this.attributeOptionRepository.create(args);
    return this.attributeOptionRepository.save(option);
  }

  async list(query: AttributeOptionQueryDto) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.attributeOptionRepository.list(page, perpage, query);
    return {
      page,
      perpage,
      data,
      total
    }
  }

  async get(id: number) {
    const option = await this.attributeOptionRepository.getById(id);
    if (!option) {
      throw new NotFoundException('not found attribute option');
    }
    return option;
  }

  async update(id: number, args: AttributeOptionUpdateDto) {
    const { name } = args;
    const option = await this.get(id);
    option.name = name || option.name;
    return this.attributeOptionRepository.save(option);
  }

  async delete(id: number) {
    const option = await this.get(id);
    option.isDeleted = true;
    return this.attributeOptionRepository.save(option);
  }
}