/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
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
    return this.orderLineRepository.save(orderLine);
  }
}
