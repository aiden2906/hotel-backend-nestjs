import AModel from 'src/shared/models/AModel';
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer extends AModel {
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
  dateOfBirth: Date;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;

  @AfterLoad()
  updateFields() {
    this.fullname = `${this.lastname || ''} ${this.firstname || ''}`;
  }
}
