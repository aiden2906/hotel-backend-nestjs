/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
import { Attribute } from '../models/attribute.entity';

@EntityRepository(Attribute)
export class AttributeRepository extends AbstractRepository<Attribute> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(attribute: Attribute, data?: object): Promise<Attribute> {
    if (data) {
      attribute = this.repository.merge(attribute, data);
    }
    return this.repository.save(attribute);
  }

  getById(id: number): Promise<Attribute> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  getByName(name: string): Promise<Attribute> {
    return this.repository.findOne({
      where: { name, isDeleted: false },
    });
  }

  list(conditions: FindConditions<Attribute>,page: number, perpage: number) {
    return this.repository.findAndCount({
      where: conditions,
      take: perpage,
      skip: page * perpage,
    })
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
