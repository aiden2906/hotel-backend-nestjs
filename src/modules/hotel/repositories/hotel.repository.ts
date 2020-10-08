/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
import { HotelQueryDto } from '../dtos/hotel-query.dto';
import { Hotel } from '../models/hotel.entity';

@EntityRepository(Hotel)
export class HotelRepository extends AbstractRepository<Hotel> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(hotel: Hotel, data?: object): Promise<Hotel> {
    if (data) {
      hotel = this.repository.merge(hotel, data);
    }
    return this.repository.save(hotel);
  }

  getById(id: number): Promise<Hotel> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(conditions: FindConditions<Hotel>, page: number, perpage: number) {
    return this.repository.findAndCount({
      where: conditions,
      take: perpage,
      skip: page * perpage,
    });
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }

  getByIdWithRelation(id: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .where('hotel.isDeleted = FALSE AND hotel.id = :id', { id })
      .leftJoinAndSelect(`hotel.owner`, `owner`)
      .leftJoinAndSelect(`hotel.rooms`, `room`, `room.isDeleted = FALSE`)
      .leftJoinAndSelect(`hotel.reviews`, `review`, `review.isDeleted = FALSE`);
    return queryBuilder.getOne();
  }
}
