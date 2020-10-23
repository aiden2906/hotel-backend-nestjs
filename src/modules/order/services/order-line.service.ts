/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable } from '@nestjs/common';
import { RoomService } from 'src/modules/room/services/room.service';
import { OrderLineDto } from '../dtos/order.dto';
import { OrderLineRepository } from '../repositories/order-line.repository';
import { TransactionService } from './transaction.service';

@Injectable()
export class OrderLineService {
  constructor(
    private readonly orderLineRepository: OrderLineRepository,
    private readonly roomService: RoomService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(args: OrderLineDto) {
    const orderLine = this.orderLineRepository.create(args);
    const { roomId, quantity } = orderLine;
    const start = new Date(orderLine.start);
    const end = new Date(orderLine.end);
    const days = this.transactionService.getDates(start, end);
    await Promise.all(
      days.map(day =>
        this.transactionService.create({ roomId, quantity, day }),
      ),
    );
    return this.orderLineRepository.save(orderLine);
  }

  async checkStock(roomId: number, start: Date, end: Date) {
    const room = await this.roomService.getWithStock(roomId, start, end);
    for (const trans of room.transaction) {
      if (room.stock - trans.sum < 0) {
        return false;
      }
    }
    return true;
  }

  async getWithRelation(orderId: number) {
    const orderLines = await this.orderLineRepository.getWithRelation(orderId);
    if (!orderLines) {
      throw new BadRequestException('Not fousnd orderline');
    }
    return orderLines;
  }
}
