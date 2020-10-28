import { Review } from 'src/modules/review/models/review.entity';
import { Room } from 'src/modules/room/models/room.entity';
import { User } from 'src/modules/user/models/user.entity';
import AModel from 'src/shared/models/AModel';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hotel extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    nullable: true,
  })
  provinceId: number;

  @Column({
    nullable: true,
  })
  districtId: number;

  @Column({
    nullable: true,
  })
  wardId: number;

  @Column()
  ownerId: number;

  @Column({
    nullable: true,
    default: 0,
    type: 'double precision'
  })
  rating: number;

  @Column({
    nullable: true,
    default: 0,
    type: 'double precision'
  })
  minPrice: number;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(
    () => Room,
    room => room.hotel,
  )
  rooms: Room[];

  @OneToMany(
    () => Review,
    review => review.hotel,
  )
  reviews: Review[];

  @Column({
    type: 'json',
    nullable: true,
  })
  images: string[];

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'tsvector',
    select: false,
    nullable: true,
  })
  name_tsv: string;
}
