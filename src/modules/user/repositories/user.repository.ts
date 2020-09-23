/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { EntityRepository, AbstractRepository } from 'typeorm';
import { UserQueryDto } from '../dtos/user-query.dto';
import { User } from '../models/user.entity';
import { UserRole } from '../user.constant';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  create(data: object) {
    return this.repository.create(data);
  }

  save(user: User, data?: object) {
    if (data) {
      user = this.repository.merge(user, data);
    }
    return this.repository.save(user);
  }

  list(page: number, perpage: number, query?: UserQueryDto): Promise<any> {
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .where(`user.isDeleted = FALSE`)
      .take(perpage)
      .skip(page * perpage);
    return queryBuilder.getManyAndCount();
  }

  getById(id: number) {
    return this.repository.findOne({
      where: { id, isDeleted: false },
    });
  }

  getByUsername(username: string) {
    return this.repository.findOne({
      where: { username, isDeleted: false },
    });
  }

  getByIdWithRelation(id: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .where(`user.isDeleted = FALSE AND user.id = :id`, { id })
      .leftJoinAndSelect(`user.hotels`, 'hotel')
      .leftJoinAndSelect(`user.rooms`, 'room');
    return queryBuilder.getOne();
  }

  getUserByRole(role: UserRole) {
    return this.repository.find({
      where: { role, isDeleted: false },
    });
  }

  update(id: number, data: object) {
    return this.repository.update(id, data);
  }
}
