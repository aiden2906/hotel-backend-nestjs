/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions, Like } from 'typeorm';
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
    const queryBuilder = this.repository.createQueryBuilder('hotel').where(`hotel.isDeleted = FALSE`);
    if (conditions.ownerId) {
      queryBuilder.andWhere(`hotel.ownerId = :ownerId`, {ownerId: conditions.ownerId});
    }
    if (conditions.ownerId) {
      queryBuilder.andWhere(`hotel.ownerId = :ownerId`, {ownerId: conditions.ownerId});
    }
    if (conditions.provinceId) {
      queryBuilder.andWhere(`hotel.provinceId = :provinceId`, {provinceId: conditions.provinceId});
    }
    if (conditions.districtId) {
      queryBuilder.andWhere(`hotel.districtId = :districtId`, {districtId: conditions.districtId});
    }
    if (conditions.wardId) {
      queryBuilder.andWhere(`hotel.wardId = :wardId`, {wardId: conditions.wardId});
    }
    if (conditions.name) {
      queryBuilder.andWhere(`hotel.name like :name`, {name: `%${conditions.name}%`});
    }
    queryBuilder.take(perpage);
    queryBuilder.skip(page*perpage);
    return queryBuilder.getManyAndCount();
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
