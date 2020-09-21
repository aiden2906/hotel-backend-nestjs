/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { UserQueryDto } from '../dtos/user-query.dto';
import { Customer } from '../models/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends AbstractRepository<Customer> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(customer: Customer, data?: object): Promise<Customer>{
    if (data) {
      customer = this.repository.merge(customer, data);
    }
    return this.repository.save(customer);
  }

  list(page: number, perpage:number, query?: UserQueryDto): Promise<any> {
    const queryBuilder = this.repository
      .createQueryBuilder('customer')
      .where(`user.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  getById(id: number): Promise<Customer> {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  getByUsername(username: string): Promise<Customer> {
    return this.repository.findOne({
      where: { username, isDeleted: false },
    });
  }

  update(id: number, data: any){
    return this.repository.update(id, data);
  }
}
