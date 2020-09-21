import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonService } from 'src/shared/common/common.service';
import { UserQueryDto } from '../dtos/user-query.dto';
import { UserCreateDto, LoginDto, UserUpdateDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonService: CommonService,
  ) {}

  async list(query: UserQueryDto): Promise<any>{
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.userRepository.list(page, perpage, query);
    return {
      page,
      perpage,
      data,
      total,
    };
  }

  async create(args: UserCreateDto): Promise<User> {
    const { username, password } = args;
    const existedUser = await this.userRepository.getByUsername(username);
    if (existedUser) {
      throw new BadRequestException('username already existed');
    }
    const { salt, hash } = this.commonService.passwordHash(password);
    args.password = hash;
    args.salt = salt;
    const user = this.userRepository.create(args);
    return this.userRepository.save(user);
  }

  async get(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new BadRequestException('not found user');
    }
    return user;
  }

  async checkLogin(args: LoginDto): Promise<User> {
    const { username, password } = args;
    const user = await this.userRepository.getByUsername(username);
    if (!user) {
      throw new BadRequestException('not found user');
    }
    await this.validateUserPassword(user.id, password);
    return user;
  }

  async validateUserPassword(id: number, password: string): Promise<User> {
    const user = await this.userRepository.getById(id);
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

  async update(id: number, args: UserUpdateDto): Promise<User> {
    const user = await this.get(id);
    user.fullname = args.fullname || user.fullname;
    user.phone = args.phone || user.phone;
    user.address = args.address || user.address;
    user.email = args.email || user.email;
    user.avatar = args.avatar || user.avatar;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);
    user.isDeleted = true;
    return this.userRepository.save(user);
  }
}
