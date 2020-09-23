import { Room } from 'src/modules/room/models/room.entity';
import AModel from 'src/shared/models/AModel';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderLine extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  roomId: number;

  @Column()
  quantity: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  price: number;

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Room)
  room: Room;
}
