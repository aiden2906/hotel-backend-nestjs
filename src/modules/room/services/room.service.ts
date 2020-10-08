/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AttributeOptionService } from 'src/modules/attribute/services/attribute-option.service';
import { AttributeService } from 'src/modules/attribute/services/attribute.service';
import { HotelService } from 'src/modules/hotel/services/hotel.service';
import { TransactionService } from 'src/modules/order/services/transaction.service';
import { RoomQueryDto } from '../dtos/room-query.dto';
import { RoomCreateDto, RoomUpdateDto } from '../dtos/room.dto';
import { Room } from '../models/room.entity';
import { RoomRepository } from '../repositories/room.repository';
import { RoomAttributeService } from './room-attribute.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly transactionService: TransactionService,
    private readonly attributeService: AttributeService,
    private readonly attributeOptionService: AttributeOptionService,
    private readonly roomAttributeService: RoomAttributeService,
    @Inject(forwardRef(()=> HotelService))
    private readonly hotelService: HotelService,
  ) {}

  async list(query: RoomQueryDto) {
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const filter = {
      isDeleted: false,
      hotelId: query.hotelId
    }
    const [data, total] = await this.roomRepository.list(filter, page, perpage);
    return {
      page,
      perpage,
      data,
      total,
    };
  }

  async create(args: RoomCreateDto, ownerId: number) {
    const { attributes } = args;
    let room = this.roomRepository.create({...args, ownerId});
    console.log('---- Room created: ', room);
    room = await this.roomRepository.save(room);
    console.log('---- Room created: ', room);
    await Promise.all(attributes.map(async (a) => {
      const {attributeId, attributeOptionId} = a;
      const attr = await this.attributeService.get(attributeId);
      const option = await this.attributeOptionService.get(attributeOptionId);
      return this.roomAttributeService.create({
        attributeId: attr.id,
        attributeOptionId: option.id,
        roomId: room.id,
      })
    }));
    this.hotelService.updateMinPrice(args.hotelId);
    return room;
  }

  async get(id: number): Promise<Room> {
    const room = await this.roomRepository.getByIdWithRelation(id);
    if (!room) {
      throw new NotFoundException('Not found room');
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
    const { name, stock, regularPrice, salePrice, images, description } = args;
    const room = await this.roomRepository.getById(id);
    room.name = name || room.name;
    room.stock = stock || room.stock;
    room.regularPrice = regularPrice || room.regularPrice;
    room.salePrice = salePrice || room.salePrice;
    room.images = images || room.images;
    room.description = description || room.description;
    this.hotelService.updateMinPrice(room.hotelId);
    return this.roomRepository.save(room);
  }

  async delete(id: number) {
    const room = await this.roomRepository.getById(id);
    room.isDeleted = true;
    this.hotelService.updateMinPrice(room.hotelId);
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
