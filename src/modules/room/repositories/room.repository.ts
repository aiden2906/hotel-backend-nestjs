/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
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
    return this.repository.findOne({
      where: { id, isDeleted: false },
      relations: ['roomAttributes']
    })
  }

  list(query: any) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const queryBuilder = this.repository
      .createQueryBuilder('room')
      .where(`room.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    if (query.hotelId) {
      queryBuilder.andWhere(`room.hotelId = :hotelId`, {hotelId: query.hotelId});
    }
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
