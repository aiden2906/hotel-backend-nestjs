import { AttributeOption } from "src/modules/attribute/models/attribute-option.entity";
import { Attribute } from "src/modules/attribute/models/attribute.entity";
import AModel from "src/shared/models/AModel";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class RoomAttribute  extends AModel{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  attributeId: number;

  @Column()
  attributeOptionId: number;

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => Attribute)
  attribute: Attribute;

  @ManyToOne(() => AttributeOption)
  attributeOption: AttributeOption;
}