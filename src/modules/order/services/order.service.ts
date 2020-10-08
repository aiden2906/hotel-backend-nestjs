/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelService } from 'src/modules/hotel/services/hotel.service';
import { UserService } from 'src/modules/user/services/user.service';
import { TelegramService } from 'src/shared/notification/telegram.service';
import { OrderQueryDto } from '../dtos/order-query.dto';
import { OrderCreateDto, OrderLineDto } from '../dtos/order.dto';
import { OrderStatus } from '../order.constant';
import { OrderRepository } from '../repositories/order.repository';
import { OrderLineService } from './order-line.service';
import { TransactionService } from './transaction.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderLineService: OrderLineService,
    private readonly hotelService: HotelService,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
    private readonly telegramService: TelegramService,
  ) {}

  async create(userId: number, args: OrderCreateDto) {
    const { orderLines, fullname, email, phone, hotelId } = args;
    const hotel = await this.hotelService.get(hotelId);
    const data = {
      customerId: userId,
      fullname,
      email,
      phone,
      hotelId: hotel.id,
      status: OrderStatus.NEW,
    };
    //TODO: check stock
    let order = this.orderRepository.create(data);
    order = await this.orderRepository.save(order);
    await Promise.all(
      orderLines.map(l => {
        const { quantity, start, end, price, roomId } = l;
        const dto: OrderLineDto = {
          quantity,
          start,
          end,
          price,
          roomId,
          orderId: order.id,
        };
        return this.orderLineService.create(dto);
      }),
    );
    if (hotel.owner.chatId) {
      const message = {
        name: hotel.name,
        date: Date.now(),
        orderLines,
        fullname,
        email,
        phone,
      };
      this.telegramService.send(message, hotel.owner.chatId);
    }
    return order;
  }

  async list(query: OrderQueryDto) {
    const [data, total] = await this.orderRepository.list(query);
    return {
      page: query.page || 0,
      perpage: query.perpage || 50,
      data,
      total,
    };
  }

  async get(id: number) {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      throw new NotFoundException('Not found order');
    }
    return order;
  }

  async complete(id: number) {
    const order = await this.orderRepository.getByIdWithRelation(id);
    order.status = OrderStatus.DONE;
    await Promise.all(
      order.orderLines.map(async l => {
        const { roomId, quantity } = l;
        const start = new Date(l.start);
        const end = new Date(l.end);
        const days = this.transactionService.getDates(start, end);
        await Promise.all(
          days.map(day =>
            this.transactionService.create({ roomId, quantity, day }),
          ),
        );
      }),
    );
    return this.orderRepository.save(order);
  }

  async cancel(id: number) {
    const order = await this.get(id);
    if (order.status === OrderStatus.DONE) {
      throw new NotFoundException('Order status is invalid');
    }
    order.status = OrderStatus.CANCEL;
    return this.orderRepository.save(order);
  }

  async checkPermission(id: number, userId: number) {
    const order = await this.orderRepository.getByIdWithRelation(id);
    const user = await this.userService.get(userId);
    console.log('---- Order: ', order);
    console.log('---- User: ', user);
    if (user.id === order.hotel.ownerId || user.hotelId === order.hotelId) {
      return true;
    }
    return false;
  }
}
