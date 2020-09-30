/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RoomAttributeCreateDto } from "../dtos/room.dto";
import { RoomAttributeRepository } from "../repositories/room-attribute.repository";

@Injectable()
export class RoomAttributeService {

  constructor(private readonly roomAttributeRepository: RoomAttributeRepository) {}

  async create(args: RoomAttributeCreateDto){
    const existedRoomAttr = await this.roomAttributeRepository.get(args);
    if (existedRoomAttr) {
      throw new BadRequestException('room attribute already exists');
    }
    const roomAttr = await this.roomAttributeRepository.create(args);
    return this.roomAttributeRepository.save(roomAttr);
  }

  async get(id: number) {
    const roomAttr = await this.roomAttributeRepository.getById(id);
    if (!roomAttr) {
      throw new NotFoundException('not found room attribute');
    }
    return roomAttr;
  }

  async delete(id: number) {
    const roomAttr = await this.get(id);
    roomAttr.isDeleted = true;
    return this.roomAttributeRepository.save(roomAttr);
  }
}