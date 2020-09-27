/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/auth/jwt-auth.guard";
import { OrderCreateDto } from "../dtos/order.dto";
import { OrderService } from "../services/order.service";

@Controller('api.order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() args: OrderCreateDto, @Req() req) {
    const {id: userId, role} = req.user || {};
    if (['owner', 'receptionist'].includes(role)) {
      throw new ForbiddenException('no permission');
    }
    return this.orderService.create(userId, args);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id', new ParseIntPipe()) id: number) {
    return this.orderService.get(id);
  }

  @Put(':id/complete')
  @UseGuards(JwtAuthGuard)
  async complete(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const {role, id: userId} = req.user || {};
    console.log(role);
    const check = await this.orderService.checkPermission(id, userId);
    if (!['admin'].includes(role) && !check) {
      throw new ForbiddenException('no permission');
    }
    return this.orderService.complete(id);
  }

  @Put(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancel(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const {role, id: userId} = req.user || {};
    const check = await this.orderService.checkPermission(id, userId);
    if (!['admin'].includes(role) && !check) {
      throw new ForbiddenException('no permission');
    }
    return this.orderService.cancel(id);
  }
}
