import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Province {
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  country_id: number;

  @Column()
  name: string;
}