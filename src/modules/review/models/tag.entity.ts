import AModel from "src/shared/models/AModel";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    select: false,
    default: false,
  })
  isDeleted: boolean;
}