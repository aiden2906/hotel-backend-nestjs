import { Hotel } from 'src/modules/hotel/models/hotel.entity';
import { Room } from 'src/modules/room/models/room.entity';
import AModel from 'src/shared/models/AModel';
import { AfterLoad, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole, USER_ROLE } from '../user.constant';

@Entity()
export class User extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  firstname: string;

  @Column({
    nullable: true,
  })
  lastname: string;

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
  avatar: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    nullable: true,
  })
  dateOfBirth: Date;

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

  @OneToMany(()=> Hotel, hotel => hotel.owner)
  hotels: Hotel[];

  @OneToMany(() => Room, room => room.owner)
  rooms: Room[];

  @AfterLoad()
  updateFields() {
    this.fullname = `${this.lastname || ''} ${this.firstname || ''}`;
  }
}
