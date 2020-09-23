/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@nestjs/common";
import { TransactionDto } from "../dtos/order.dto";
import { TransactionRepository } from "../repositories/transaction.repository";

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async create(args: TransactionDto) {
    const { day } = args;
    args.day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    const tran = this.transactionRepository.create(args);
    return this.transactionRepository.save(tran);
  }

  async getByRoomId(roomId: number, start: Date, end: Date) {
    return this.transactionRepository.getByRoomId(roomId, start, end);
  }

  getDates(start: Date, end: Date) {
    const days = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate()+1);
    }
    return days;
  }
}