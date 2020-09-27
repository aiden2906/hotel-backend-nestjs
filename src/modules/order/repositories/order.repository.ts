/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { Order } from '../models/order.entity';

@EntityRepository(Order)
export class OrderRepository extends AbstractRepository<Order> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(order: Order, data?: object): Promise<Order> {
    if (data) {
      order = this.repository.merge(order, data);
    }
    return this.repository.save(order);
  }

  getById(id: number): Promise<Order> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('order')
      .where(`order.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }

  getByIdWithRelation(id: number) {
    return this.repository.findOne({
      where: { id, isDeleted: false },
      relations: ['orderLines', 'hotel'],
    });
  }
}
