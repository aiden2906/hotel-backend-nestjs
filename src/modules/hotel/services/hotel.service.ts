/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException, Injectable } from "@nestjs/common";
import { HotelQueryDto } from "../dtos/hotel-query.dto";
import { HotelCreateDto, HotelUpdateDto } from "../dtos/hotel.dto";
import { Hotel } from "../models/hotel.entity";
import { HotelRepository } from "../repositories/hotel.repository";

@Injectable()
export class HotelService {

  constructor(private readonly hotelRepository: HotelRepository) {}

  async get(id: number): Promise<Hotel>{
    const hotel = await this.hotelRepository.getByIdWithRelation(id);
    if (!hotel) {
      throw new BadRequestException('Not found hotel');
    }
    return hotel;
  }

  async create(args: HotelCreateDto): Promise<Hotel>{
    const hotel = this.hotelRepository.create(args);
    return this.hotelRepository.save(hotel);
  }

  async list(query: HotelQueryDto): Promise<any>{
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.hotelRepository.list(page, perpage, query);
    return {
      page,
      perpage,
      data,
      total
    }
  }

  async update(id: number, args: HotelUpdateDto) {
    const {name, address, provinceId, districtId, images, description} = args;
    const hotel = await this.hotelRepository.getById(id);
    hotel.name = name || hotel.name;
    hotel.address = address || hotel.address;
    hotel.description = description || hotel.description;
    hotel.provinceId = provinceId || hotel.provinceId;
    hotel.districtId = districtId || hotel.districtId;
    hotel.images = images || hotel.images;
    return this.hotelRepository.save(hotel);
  }
  
  async delete(id: number) {
    const hotel = await this.hotelRepository.getById(id);
    hotel.isDeleted = true;
    return this.hotelRepository.save(hotel);
  }

  async checkPermission(id: number, userId: number) {
    const hotel = await this.get(id);
    if (hotel.ownerId !== userId) {
      return false;
    }
    return true;
  }
}