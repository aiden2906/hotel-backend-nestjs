/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@nestjs/common";
import { RoomAttributeCreateDto } from "../dtos/room.dto";
import { RoomAttributeRepository } from "../repositories/room-attribute.repository";

@Injectable()
export class RoomAttributeService {

  constructor(private readonly roomAttributeRepository: RoomAttributeRepository) {}

  async create(args: RoomAttributeCreateDto){
    const roomAttr = await this.roomAttributeRepository.create(args);
    return this.roomAttributeRepository.save(roomAttr);
  }
}