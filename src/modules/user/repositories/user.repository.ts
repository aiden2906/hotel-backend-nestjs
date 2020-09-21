import { EntityRepository, AbstractRepository } from 'typeorm';
import { UserQueryDto } from '../dtos/user-query.dto';
import { UserCreateDto } from '../dtos/user.dto';
import { User } from '../models/user.entity';
import { UserRole } from '../user.constant';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async create(dto: UserCreateDto): Promise<User> {
    const {
      username,
      fullname,
      password,
      phone,
      address,
      email,
      role,
      salt
    } = dto;
    const user = this.repository.create({
      fullname,
      username,
      password,
      phone,
      email,
      address,
      role,
      salt
    });
    return this.repository.save(user);
  }

  async list(query: UserQueryDto): Promise<any> {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const queryBuilder = await this.repository
      .createQueryBuilder('user')
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

  async getById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id, isDeleted: false },
    });
    return user;
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { username, isDeleted: false },
    });
    return user;
  }

  async getUserByRole(role: UserRole): Promise<User[]> {
    const users = await this.repository.find({
      where: { role, isDeleted: false },
    });
    return users;
  }

  async update(user: User): Promise<User>{
    return this.repository.save(user);
  }

  async delete(id: number): Promise<User>{
    const user = await this.getById(id);
    user.isDeleted = true;
    await this.repository.save(user);
    return user;
  }
}
