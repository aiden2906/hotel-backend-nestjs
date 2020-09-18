import { Injectable } from "@nestjs/common";
import bcrypt = require('bcryptjs');

@Injectable()
export class CommonService {
  passwordHash(pwd: string): any {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(salt + pwd, 10);
    return {
      salt,
      hash,
    };
  }
  comparePassword(password: string, hash: string, salt: string): boolean{
    return bcrypt.compareSync(salt + password, hash);
  }
}