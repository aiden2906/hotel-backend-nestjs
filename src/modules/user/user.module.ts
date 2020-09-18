import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/shared/common/common.module';
import { CustomerController, UserController } from './controllers/user.controller';
import { Customer } from './models/customer.entity';
import { User } from './models/user.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { UserRepository } from './repositories/user.repository';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Customer,
      CustomerRepository,
    ]),
    CommonModule,
  ],
  controllers: [UserController, CustomerController],
  providers: [UserService, CustomerService],
  exports: [UserService, CustomerService],
})
export class UserModule {}
