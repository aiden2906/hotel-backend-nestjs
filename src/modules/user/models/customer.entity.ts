import AModel from 'src/shared/models/AModel';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
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
    default: false,
    select: false,
  })
  isDeleted: boolean;
}
