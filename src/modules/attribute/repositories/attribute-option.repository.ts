/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
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

  list(
    conditions: FindConditions<AttributeOption>,
    page: number,
    perpage: number,
  ) {
    return this.repository.findAndCount({
      where: conditions,
      take: perpage,
      skip: page * perpage,
    });
  }

  listByAttributeId(id: number) {
    return this.repository.find({
      where: {
        isDeleted: false,
        attributeId: id,
      },
    });
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
