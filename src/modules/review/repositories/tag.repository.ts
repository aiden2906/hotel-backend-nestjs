/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { Tag } from '../models/tag.entity';

@EntityRepository(Tag)
export class TagRepository extends AbstractRepository<Tag> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(tag: Tag, data?: object): Promise<Tag> {
    if (data) {
      tag = this.repository.merge(tag, data);
    }
    return this.repository.save(tag);
  }

  getById(id: number): Promise<Tag> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('tag')
      .where(`tag.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
