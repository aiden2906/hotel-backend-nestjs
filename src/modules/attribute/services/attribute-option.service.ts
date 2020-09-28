/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable } from "@nestjs/common";
import { AttributeOptionRepository } from "../repositories/attribute-option.repository";

@Injectable()
export class AttributeOptionService {
  constructor(private readonly attributeOptionRepository: AttributeOptionRepository) {}

  async create(args) {
    const attr = await this.attributeOptionRepository.create(args);
    return this.attributeOptionRepository.save(attr);
  }

  async list(query) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.attributeOptionRepository.list(page, perpage);
    return {
      page,
      perpage,
      data,
      total
    }
  }

  async get(id: number) {
    const attr = await this.attributeOptionRepository.getById(id);
    if (!attr) {
      throw new BadRequestException('not found attribute option');
    }
    return attr;
  }

  async delete(id: number) {
    const attr = await this.get(id);
    attr.isDeleted = true;
    return this.attributeOptionRepository.save(attr);
  }
}