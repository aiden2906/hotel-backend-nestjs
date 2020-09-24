import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Province } from "./province.entity";

@Entity()
export class District {
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  provinceId: number;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'provinceId'})
  province: Province;
}