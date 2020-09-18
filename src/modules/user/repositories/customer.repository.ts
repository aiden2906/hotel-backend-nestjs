import { EntityRepository, AbstractRepository } from 'typeorm';
import { CustomerDto } from '../dtos/customer.dto';
import { UserQueryDto } from '../dtos/user-query.dto';
import { Customer } from '../models/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends AbstractRepository<Customer> {
  async create(dto: CustomerDto): Promise<Customer> {
    const {
      username,
      fullname,
      password,
      phone,
      address,
      email,
      salt,
    } = dto;
    const user = this.repository.create({
      fullname,
      username,
      password,
      phone,
      email,
      address,
      salt,
    });
    return this.repository.save(user);
  }

  async list(query: UserQueryDto): Promise<any> {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const queryBuilder = await this.repository
      .createQueryBuilder('customer')
      .where(`user.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
      page,
      perpage,
    };
  }

  async getById(id: number): Promise<Customer> {
    const customer = await this.repository.findOne({
      where: { id, isDeleted: false },
    });
    return customer;
  }

  async getByUsername(username: string): Promise<Customer> {
    const customer = await this.repository.findOne({
      where: { username, isDeleted: false },
    });
    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    return await this.repository.save(customer);
  }

  async delete(id: number): Promise<Customer>{
    const customer = await this.getById(id);
    customer.isDeleted = true;
    await this.repository.save(customer);
    return customer;
  }
}
