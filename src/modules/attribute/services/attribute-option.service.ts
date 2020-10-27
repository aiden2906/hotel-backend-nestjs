/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoomAttributeService } from 'src/modules/room/services/room-attribute.service';
import {
  AttributeOptionCreateDto,
  AttributeOptionQueryDto,
  AttributeOptionUpdateDto,
} from '../dtos/attribute-option.dto';
import { AttributeOptionRepository } from '../repositories/attribute-option.repository';

@Injectable()
export class AttributeOptionService {
  constructor(
    private readonly attributeOptionRepository: AttributeOptionRepository,
    @Inject(forwardRef(() => RoomAttributeService))
    private readonly roomAttributeService: RoomAttributeService,
  ) {}

  async create(args: AttributeOptionCreateDto) {
    const { name, attributeId } = args;
    const existedOption = await this.attributeOptionRepository.getByName(
      name,
      attributeId,
    );
    if (existedOption) {
      throw new BadRequestException('option already exists');
    }
    const option = this.attributeOptionRepository.create(args);
    return this.attributeOptionRepository.save(option);
  }

  async list(query: AttributeOptionQueryDto) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const filter: any = {
      isDeleted: false,
    };
    if (query.attributeId) {
      filter.attributeId = query.attributeId;
    }
    const [data, total] = await this.attributeOptionRepository.list(
      filter,
      page,
      perpage,
    );
    return {
      page,
      perpage,
      data,
      total,
    };
  }

  listByAttributeId(attributeId: number) {
    return this.attributeOptionRepository.listByAttributeId(attributeId);
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
    const roomAttributes = await this.roomAttributeService.listByAttributeOptionId(id);
    await Promise.all(roomAttributes.map(r => {
      return this.roomAttributeService.delete(r.id);
    }))
    option.isDeleted = true;
    return this.attributeOptionRepository.save(option);
  }
}
