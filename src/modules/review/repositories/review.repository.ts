/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
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

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('review')
      .where(`review.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
