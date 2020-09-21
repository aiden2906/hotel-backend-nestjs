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
    const { username, password } = args;
    const existedUser = await this.customerRepository.getByUsername(username);
    if (existedUser) {
      throw new BadRequestException('username already existed');
    }
    const { salt, hash } = this.commonService.passwordHash(password);
    args.password = hash;
    args.salt = salt;
    const customer = this.customerRepository.create(args);
    return this.customerRepository.save(customer);
  }

  async list(query: UserQueryDto): Promise<any> {
    const page = query.page || 0;
    const perpage = query.perpage || 0;
    const [data, total] = await this.customerRepository.list(page, perpage, query);
    return {
      page,
      perpage,
      data,
      total
    };
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
    customer.avatar = args.avatar || customer.avatar;
    return this.customerRepository.save(customer);
  }

  async delete(id: number): Promise<Customer>{
    const customer = await this.customerRepository.getById(id);
    customer.isDeleted = true;
    return this.customerRepository.save(customer);
  }
}
