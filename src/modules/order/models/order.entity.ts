import AModel from 'src/shared/models/AModel';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus, ORDER_STATUS } from '../order.constant';
import { OrderLine } from './order-line.entity';

@Entity()
export class Order extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  hotelId: number;

  @Column()
  customerId: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: ORDER_STATUS,
  })
  status: OrderStatus;

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;

  @OneToMany(() => OrderLine, orderLine => orderLine.order)
  orderLines: OrderLine[];
}
