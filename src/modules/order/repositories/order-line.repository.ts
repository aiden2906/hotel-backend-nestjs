/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { OrderLineQueryDto } from '../dtos/order-query.dto';
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

  list(page: number, perpage: number, query?: OrderLineQueryDto) {
    const queryBuilder = this.repository
      .createQueryBuilder('order_line')
      .where(`order_line.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
