import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class AModel {

  public constructor(obj = {}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
