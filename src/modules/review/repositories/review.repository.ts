/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
import { Review } from '../models/review.entity';

@EntityRepository(Review)
export class ReviewRepository extends AbstractRepository<Review> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(review: Review, data?: object): Promise<Review> {
    if (data) {
      review = this.repository.merge(review, data);
    }
    return this.repository.save(review);
  }

  getById(id: number): Promise<Review> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(conditions: FindConditions<Review>, page: number, perpage: number) {
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
