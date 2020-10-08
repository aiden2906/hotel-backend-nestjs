/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
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

  list(conditions: FindConditions<Tag>, page: number, perpage: number) {
    return this.repository.findAndCount({
      where: conditions,
      take: perpage,
      skip: page * perpage,
    });
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
