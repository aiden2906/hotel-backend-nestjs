/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
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

  list(query: HotelQueryDto) {
    const { ownerId, provinceId, districtId, wardId } = query;
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .where(`hotel.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    if (ownerId) {
      queryBuilder.andWhere(`hotel.ownerId = :ownerId`, { ownerId });
    }
    if (provinceId) {
      queryBuilder.andWhere(`hotel.provinceId = :provinceId`, { provinceId });
    }
    if (districtId) {
      queryBuilder.andWhere(`hotel.districtId = :districtId`, { districtId });
    }
    if (wardId) {
      queryBuilder.andWhere(`hotel.wardId = :wardId`, { wardId });
    }
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
      .leftJoinAndSelect(`hotel.rooms`, `room`)
      .leftJoinAndSelect(`hotel.reviews`, `review`);
    return queryBuilder.getOne();
  }
}
