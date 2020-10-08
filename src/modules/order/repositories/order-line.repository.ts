/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
import { OrderLine } from '../models/order-line.entity';

@EntityRepository(OrderLine)
export class OrderLineRepository extends AbstractRepository<OrderLine> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(orderLine: OrderLine, data?: object): Promise<OrderLine> {
    if (data) {
      orderLine = this.repository.merge(orderLine, data);
    }
    return this.repository.save(orderLine);
  }

  getById(id: number): Promise<OrderLine> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  list(conditions: FindConditions<OrderLine>,page: number, perpage: number) {
    return this.repository.findAndCount({
      where: conditions,
      take: perpage,
      skip: page * perpage,
    });
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
