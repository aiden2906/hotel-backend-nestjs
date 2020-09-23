import { Hotel } from "src/modules/hotel/models/hotel.entity";
import { User } from "src/modules/user/models/user.entity";
import AModel from "src/shared/models/AModel";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room extends AModel{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  hotelId: number;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column()
  regularPrice: number;

  @Column()
  salePrice: number;

  @Column({
    select: false,
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId'})
  owner: User;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotelId'})
  hotel: Hotel;
}