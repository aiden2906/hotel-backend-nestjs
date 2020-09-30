/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { RoomAttribute } from '../models/room-attribute.entity';

@EntityRepository(RoomAttribute)
export class RoomAttributeRepository extends AbstractRepository<RoomAttribute> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(roomAttribute: RoomAttribute, data?: object): Promise<RoomAttribute> {
    if (data) {
      roomAttribute = this.repository.merge(roomAttribute, data);
    }
    return this.repository.save(roomAttribute);
  }

  get(args) {
    const { attributeId, attributeOptionId, roomId } = args;
    return this.repository.findOne({
      attributeId,
      attributeOptionId,
      roomId,
      isDeleted: false
    });
  }

  getById(id: number): Promise<RoomAttribute> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('room_attribute')
      .where(`room_attribute.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
