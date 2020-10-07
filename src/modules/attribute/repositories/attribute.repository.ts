/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
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

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('attribute')
      .where(`attribute.isDeleted = FALSE`)
      .leftJoinAndSelect(
        `attribute.attributeOptions`,
        `attributeOption`,
        `attributeOption.isDeleted = FALSE`,
      )
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
