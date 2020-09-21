import { User } from "src/modules/user/models/user.entity";
import AModel from "src/shared/models/AModel";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  provinceId: number;

  @Column()
  districtId: number;

  @Column()
  ownerId: number;

  @ManyToOne(()=> User, owner => owner.hotels)
  owner: User;

  @Column({
    array: true,
  })
  images: string[];

  @Column({
    default: false,
    select: false,
  })
  isDeleted: boolean;
}