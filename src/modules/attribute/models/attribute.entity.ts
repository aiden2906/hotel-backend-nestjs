import AModel from 'src/shared/models/AModel';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeOption } from './attribute-option.entity';

@Entity()
export class Attribute extends AModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    select: false,
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(
    () => AttributeOption,
    attributeOption => attributeOption.attribute,
  )
  attributeOptions: AttributeOption[];
}
