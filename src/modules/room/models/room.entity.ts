import { Hotel } from "src/modules/hotel/models/hotel.entity";
import { User } from "src/modules/user/models/user.entity";
import AModel from "src/shared/models/AModel";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomAttribute } from "./room-attribute.entity";

@Entity()
export class Room extends AModel{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  hotelId: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column()
  regularPrice: number;

  @Column()
  salePrice: number;

  @Column({
    nullable: true,
  })
  capacity: number;

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId'})
  owner: User;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotelId'})
  hotel: Hotel;

  @OneToMany(()=> RoomAttribute, roomAttribute => roomAttribute.room)
  roomAttributes: RoomAttribute[];
}