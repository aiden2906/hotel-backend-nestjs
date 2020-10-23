/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HotelService } from 'src/modules/hotel/services/hotel.service';
import { RoomService } from 'src/modules/room/services/room.service';
import { UserService } from 'src/modules/user/services/user.service';
import { ConfigService } from 'src/shared/config/config.service';
import { MailService } from 'src/shared/mail/mail.service';
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
    private readonly roomService: RoomService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
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
    for (const orderLine of orderLines) {
      const { roomId, start, end } = orderLine;
      const check = await this.orderLineService.checkStock(roomId, start, end);
      if (!check) {
        throw new BadRequestException(`Out of room ${roomId}`);
      }
    }
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
    // send telegram chat to owner
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
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const { status, hotelId } = query;
    const filter: any = {
      isDeleted: false,
    };
    if (status) {
      filter.status = status;
    }
    if (hotelId) {
      filter.hotelId = hotelId;
    }
    const [data, total] = await this.orderRepository.list(
      filter,
      page,
      perpage,
    );
    return {
      page,
      perpage,
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
    order.orderLines = await this.orderLineService.getWithRelation(order.id);
    order.status = OrderStatus.DONE;
    // TODO: send mail to customer
    const { user } = this.configService.gmailAccount;
    let message = `Đơn hàng của bạn đã được xác nhân, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
===Đơn hàng của bạn ===
Tên khách sạn: ${order.hotel.name},
Địa chỉ khách sạn: ${order.hotel.address},
Danh sách đặt phòng:`;
    for (const l of order.orderLines) {
      message += `\n - ${l.room.name} : ${l.price} đ * ${l.quantity} phòng,`;
    }
    message += `\nTổng thiệt hại: ${order.orderLines.reduce(
      (c, i) => c + i.quantity * i.price,
      0,
    )}đ`;
    const option = {
      from: `"👻👻👻👻" <${user}>`,
      to: order.email,
      subject: 'Đặt phòng thành công 🤣🤣🤣',
      text: message,
      html: '',
    };
    this.mailService.sendMail(option);
    return this.orderRepository.save(order);
  }

  async cancel(id: number) {
    const order = await this.orderRepository.getByIdWithRelation(id);
    order.orderLines = await this.orderLineService.getWithRelation(order.id);
    order.status = OrderStatus.CANCEL;
    for (const orderLine of order.orderLines) {
      const { start, end, roomId, quantity } = orderLine;
      const days = this.transactionService.getDates(start, end);
      await Promise.all(
        days.map(day => {
          return this.transactionService.create({
            roomId,
            quantity: -quantity,
            day,
          });
        }),
      );
    }
    const { user } = this.configService.gmailAccount;
    const option = {
      from: `"👻👻👻👻" <${user}>`,
      to: order.email,
      subject: 'Đặt phòng thất bại 🤣🤣🤣',
      text: 'Đơn hàng của bạn đã bị hủy.',
      html: '',
    };
    this.mailService.sendMail(option);
    return this.orderRepository.save(order);
  }

  async checkPermission(id: number, userId: number) {
    const order = await this.orderRepository.getByIdWithRelation(id);
    const user = await this.userService.get(userId);
    if (user.id === order.hotel.ownerId || user.hotelId === order.hotelId) {
      return true;
    }
    return false;
  }
}
