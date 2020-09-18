import AModel from 'src/shared/models/AModel';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole, USER_ROLE } from '../user.constant';

@Entity()
export class User extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
  })
  role: UserRole;

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;
}
