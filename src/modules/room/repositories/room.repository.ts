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

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('room')
      .where(`room.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
