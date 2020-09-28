import AModel from "src/shared/models/AModel";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute.entity";

@Entity()
export class AttributeOption extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  attributeId: number;

  @ManyToOne(() =>Attribute)
  @JoinColumn({ name: 'attributeId'})
  attribute: Attribute;

  @Column({
    select: false,
    default: false,
  })
  isDeleted: boolean;
}