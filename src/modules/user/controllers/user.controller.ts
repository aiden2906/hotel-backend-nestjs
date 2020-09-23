/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/shared/auth/auth.service';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';
import { CustomerCreateDto } from '../dtos/customer.dto';
import { UserQueryDto } from '../dtos/user-query.dto';
import { LoginDto, UserCreateDto, UserUpdateDto } from '../dtos/user.dto';
import { Customer } from '../models/customer.entity';
import { User } from '../models/user.entity';
import { CustomerService } from '../services/customer.service';
import { UserService } from '../services/user.service';

@Controller('api.user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Query() query: UserQueryDto, @Req() req) {
    const role = req.user && req.user.role;
    if (!['admin'].includes(role)) {
      throw new ForbiddenException('no permission');
    }
    return this.userService.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req,
  ): Promise<User> {
    const { id: userId, role } = req.user;
    if (userId !== id && !['admin'].includes(role)) {
      throw new ForbiddenException(`no permission`);
    }
    return this.userService.get(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: UserUpdateDto,
    @Req() req
  ): Promise<Customer> {
    const {id: userId, role} = req;
    if (userId !== id && !['admin'].includes(role)){
      throw new ForbiddenException('no permission');
    }
    return this.userService.update(id, args);
  }

  @Post('login')
  async login(@Body() args: LoginDto): Promise<any> {
    const user = await this.userService.checkLogin(args);
    const token = await this.authService.signIn({
      id: user.id,
      role: user.role,
    });
    return {
      accessToken: token,
      user
    };
  }

  @Post('register')
  async register(@Body() args: UserCreateDto): Promise<User> {
    return this.userService.create(args);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const role = req.user && req.user.role;
    if (!['admin'].includes(role)) {
      throw new ForbiddenException('no permission');
    }
    return this.userService.delete(id);
  }

  @Post('check-token')
  @UseGuards(JwtAuthGuard)
  async checkToken() {
    return true;
  }
}

@Controller('api.customer')
export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Query() query: UserQueryDto, @Req() req) {
    const role = req.user && req.user.role;
    if (!['admin'].includes(role)) {
      throw new ForbiddenException('no permission');
    }
    return this.customerService.list(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req,
  ): Promise<Customer> {
    const { id: userId, role } = req.user;
    if (userId !== id && !['admin'].includes(role)) {
      throw new ForbiddenException(`no permission`);
    }
    return this.customerService.get(id);
  }

  @Post('login')
  async login(@Body() args: LoginDto): Promise<any> {
    const customer = await this.customerService.checkLogin(args);
    const token = await this.authService.signIn({ id: customer.id });
    return {
      accessToken: token,
      user: customer
    };
  }

  @Post('register')
  async register(@Body() args: CustomerCreateDto): Promise<Customer> {
    return this.customerService.create(args);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: UserUpdateDto,
    @Req() req
  ): Promise<Customer> {
    const userId = req.user && req.user.id;
    return this.customerService.update(userId, args);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const role = req.user && req.user.role;
    if (!['admin'].includes(role)) {
      throw new ForbiddenException('no permission');
    }
    return this.customerService.delete(id);
  }
}
