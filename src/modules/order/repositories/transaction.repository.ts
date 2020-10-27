/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { Transaction } from '../models/transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends AbstractRepository<Transaction> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(transaction: Transaction, data?: object): Promise<Transaction> {
    if (data) {
      transaction = this.repository.merge(transaction, data);
    }
    return this.repository.save(transaction);
  }

  getById(id: number): Promise<Transaction> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  getByRoomId(roomId: number, start: Date, end: Date) {
    const queryBuilder = this.repository
      .createQueryBuilder('transaction')
      .select(`SUM (transaction.quantity), transaction.day`)
      .where(`transaction.isDeleted = FALSE AND transaction.roomId = :roomId`, {
        roomId,
      })
      .andWhere(`transaction.day BETWEEN :start AND :end`, { start, end })
      .groupBy(`transaction.day`);
    return queryBuilder.getRawMany();
  }

  list(page: number, perpage: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('transaction')
      .where(`transaction.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  listByRoomId(roomId: number) {
    return this.repository.find({
      where: { isDeleted: false, roomId },
    });
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
