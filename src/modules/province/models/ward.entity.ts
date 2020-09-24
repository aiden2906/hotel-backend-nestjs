import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { District } from "./district.entity";

@Entity()
export class Ward {
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  districtId: number;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'districtId'})
  district: District;
}