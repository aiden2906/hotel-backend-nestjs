/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpService } from '@nestjs/common';
// import { JwtDTO } from 'shared/dtos/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: any): Promise<string> {
    return await this.jwtService.sign(user);
  }

  async verifyJwt(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  async validateUser(payload: any): Promise<any> {
    console.log('---Payload : ', payload);
    return payload;
  }
}
