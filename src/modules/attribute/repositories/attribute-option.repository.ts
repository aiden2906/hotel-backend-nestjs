/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { AttributeOptionQueryDto } from '../dtos/attribute-option.dto';
import { AttributeOption } from '../models/attribute-option.entity';

@EntityRepository(AttributeOption)
export class AttributeOptionRepository extends AbstractRepository<
  AttributeOption
> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(option: AttributeOption, data?: object): Promise<AttributeOption> {
    if (data) {
      option = this.repository.merge(option, data);
    }
    return this.repository.save(option);
  }

  getById(id: number): Promise<AttributeOption> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  getByName(name: string, attributeId: number) {
    return this.repository.findOne({
      where: { name, attributeId, isDeleted: false },
    });
  }

  list(page: number, perpage: number, query: AttributeOptionQueryDto) {
    const { attributeId } = query;
    const queryBuilder = this.repository
      .createQueryBuilder('attribute_option')
      .where(`attribute_option.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    if (attributeId) {
      queryBuilder.andWhere(`attribute_option.attributeId = :attributeId`, {
        attributeId,
      });
    }
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
