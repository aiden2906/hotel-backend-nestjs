/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository, FindConditions } from 'typeorm';
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

  list(conditions: FindConditions<Customer>, page: number, perpage:number): Promise<any> {
    return this.repository.findAndCount({
      where: conditions,
      take: perpage,
      skip: page * perpage,
    });
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
