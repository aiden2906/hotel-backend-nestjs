import AModel from "src/shared/models/AModel";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction extends AModel{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;
  
  @Column()
  quantity: number;

  @Column()
  day: Date;

  @Column({
    select: false,
    default: false,
  })
  isDeleted: boolean;
}