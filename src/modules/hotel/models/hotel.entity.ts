import { User } from "src/modules/user/models/user.entity";
import AModel from "src/shared/models/AModel";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
  })
  description: string;

  @ManyToOne(()=> User)
  @JoinColumn({ name: 'ownerId'})
  owner: User;

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
}