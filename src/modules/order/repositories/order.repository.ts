/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
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
      relations: ['orderLines']
    });
  }

  list(conditions: FindConditions<Order>, page: number, perpage: number) {
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
    return this.repository.findOne({
      where: { id, isDeleted: false },
      relations: ['orderLines', 'hotel'],
    });
  }
}
