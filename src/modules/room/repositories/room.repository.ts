/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
import { Room } from '../models/room.entity';

@EntityRepository(Room)
export class RoomRepository extends AbstractRepository<Room> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(room: Room, data?: object): Promise<Room> {
    if (data) {
      room = this.repository.merge(room, data);
    }
    return this.repository.save(room);
  }

  getById(id: number): Promise<Room> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  getByIdWithRelation(id: number) {
    const queryBuilder = this.repository
      .createQueryBuilder(`room`)
      .where(`room.isDeleted = FALSE AND room.id = :id`, { id })
      .leftJoinAndSelect(`room.roomAttributes`, `roomAttribute`, `roomAttribute.isDeleted = FALSE`);
    return queryBuilder.getOne();
  }

  list(conditions: FindConditions<Room>, page: number, perpage: number) {
    const queryBuilder = this.repository.createQueryBuilder('room').where(`room.isDeleted = FALSE`);
    if (conditions.hotelId) {
      queryBuilder.andWhere(`room.hotelId = :hotelId`, {hotelId: conditions.hotelId});
    }
    if (conditions.name) {
      if ((conditions.name as string).split(' ').length > 1) {
        queryBuilder.andWhere(`(
          room.name_tsv @@plainto_tsquery('simple', :name_tsv)
          OR room.name ILIKE :name_like )`,
          { name_tsv: conditions.name, name_like: `%${conditions.name as string}%` },
        );
      } else {
        queryBuilder.andWhere(`(
          room.name_tsv @@to_tsquery('simple', :name_tsv)
          OR room.name ILIKE :name_like )`,
          { name_tsv: `${conditions.name}:*`, name_like: `%${conditions.name as string}%` },
        );
      }
    }
    queryBuilder.take(perpage);
    queryBuilder.skip(page*perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
