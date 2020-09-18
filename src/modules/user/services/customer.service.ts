import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from 'src/shared/common/common.service';
import { CustomerCreateDto } from '../dtos/customer.dto';
import { UserQueryDto } from '../dtos/user-query.dto';
import { LoginDto, UserUpdateDto } from '../dtos/user.dto';
import { Customer } from '../models/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    private readonly commonService: CommonService,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(args: CustomerCreateDto): Promise<Customer> {
    const { password } = args;
    const { salt, hash } = this.commonService.passwordHash(password);
    args.password = hash;
    const user = await this.customerRepository.create({ ...args, salt });
    return user;
  }

  async list(query: UserQueryDto): Promise<any> {
    const result = await this.customerRepository.list(query);
    return result;
  }

  async get(id: number): Promise<Customer> {
    const user = await this.customerRepository.getById(id);
    if (!user) {
      throw new BadRequestException('not found user');
    }
    return user;
  }

  async checkLogin(args: LoginDto): Promise<Customer> {
    const { username, password } = args;
    const user = await this.customerRepository.getByUsername(username);
    if (!user) {
      throw new BadRequestException('not found user');
    }
    await this.validateUserPassword(user.id, password);
    return user;
  }

  async validateUserPassword(id: number, password: string): Promise<Customer> {
    const user = await this.customerRepository.getById(id);
    if (!user) {
      throw new BadRequestException('not found user');
    }
    const checkPassword = this.commonService.comparePassword(
      password,
      user.password,
      user.salt,
    );

    if (!checkPassword) {
      throw new BadRequestException('incorrect password');
    }

    return user;
  }

  async update(id: number, args: UserUpdateDto): Promise<Customer>{
    const customer = await this.get(id);
    customer.fullname = args.fullname || customer.fullname;
    customer.phone = args.phone || customer.phone;
    customer.address = args.address || customer.address;
    customer.email = args.email || customer.email;
    return await this.customerRepository.update(customer);
  }

  async delete(id: number): Promise<Customer>{
    const result = await this.customerRepository.delete(id);
    return result;
  }
}
