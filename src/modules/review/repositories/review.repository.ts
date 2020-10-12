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
    const { hotelId, customerId } = conditions;
    const queryBuilder = this.repository
      .createQueryBuilder('review')
      .where(`review.isDeleted = FALSE`)
      .leftJoin(`review.customer`, `customer`)
      .addSelect(['customer.lastname', 'customer.firstname'])
      .take(perpage)
      .skip(perpage * page)
    if (hotelId) {
      queryBuilder.andWhere(`review.hotelId = :hotelId`, {hotelId})
    }
    if (customerId) {
      queryBuilder.andWhere(`review.customerId = :customerId`, {customerId})
    }
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
