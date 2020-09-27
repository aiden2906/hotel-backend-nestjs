/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionService } from 'src/modules/order/services/transaction.service';
import { RoomQueryDto } from '../dtos/room-query.dto';
import { RoomCreateDto, RoomUpdateDto } from '../dtos/room.dto';
import { Room } from '../models/room.entity';
import { RoomRepository } from '../repositories/room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly transactionService: TransactionService,
  ) {}

  async list(query: RoomQueryDto) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.roomRepository.list(page, perpage, query);
    return {
      page,
      perpage,
      data,
      total,
    };
  }

  async create(args: RoomCreateDto, ownerId: number) {
    const room = this.roomRepository.create({...args, ownerId});
    return this.roomRepository.save(room);
  }

  async get(id: number): Promise<Room> {
    const room = await this.roomRepository.getById(id);
    if (!room) {
      throw new BadRequestException('Not found room');
    }
    return room;
  }

  async getWithStock(id: number, start: Date, end: Date) {
    const room: any = await this.get(id);
    room.transaction = await this.transactionService.getByRoomId(
      room.id,
      start,
      end,
    );
    return room;
  }

  async update(id: number, args: RoomUpdateDto) {
    const { name, stock, regularPrice, salePrice } = args;
    const room = await this.roomRepository.getById(id);
    room.name = args.name || name;
    room.stock = args.stock || stock;
    room.regularPrice = args.regularPrice || regularPrice;
    room.salePrice = args.salePrice || salePrice;
    return this.roomRepository.save(room);
  }

  async delete(id: number) {
    const room = await this.roomRepository.getById(id);
    room.isDeleted = true;
    return this.roomRepository.save(room);
  }

  async checkPermission(id: number, userId: number) {
    const room = await this.get(id);
    if (room.ownerId === userId) {
      return true;
    }
    return false;
  }
}
