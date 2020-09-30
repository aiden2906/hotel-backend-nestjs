import { Hotel } from "src/modules/hotel/models/hotel.entity";
import { Customer } from "src/modules/user/models/customer.entity";
import AModel from "src/shared/models/AModel";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Review extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: number;

  @Column()
  customerId: number;

  @Column()
  tagId: number;

  @ManyToOne(() => Tag)
  tag: Tag;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @Column()
  rating: number;
  
  @Column()
  content: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  images: string[];

  @Column({
    select: false,
    default: false,
  })
  isDeleted: boolean;
}
