import { Module, HttpModule, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { AuthService } from './auth.service';
import AuthJWTStrategy from './auth-jwt.strategy';

const passportConfig = PassportModule.register({
  defaultStrategy: 'jwt',
  property: 'user',
});

export class AuthConfig {
  disabled: boolean;
}

@Global()
@Module({
  imports: [
    HttpModule,
    passportConfig,
    ConfigModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthService, AuthJWTStrategy],
  exports: [passportConfig, AuthService],
})
export class AuthModule {}
