/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from "@nestjs/common";
import { HotelQueryDto } from "../dtos/hotel-query.dto";
import { HotelCreateDto, HotelUpdateDto } from "../dtos/hotel.dto";
import { Hotel } from "../models/hotel.entity";
import { HotelRepository } from "../repositories/hotel.repository";

@Injectable()
export class HotelService {

  constructor(private readonly hotelRepository: HotelRepository) {}

  async get(id: number): Promise<Hotel>{
    return this.hotelRepository.getByIdWithRelation(id);
  }

  async create(args: HotelCreateDto): Promise<Hotel>{
    const hotel = await this.hotelRepository.create(args);
    return hotel;
  }

  async list(query: HotelQueryDto): Promise<any>{
    const page = query.page || 0;
    const perpage = query.perpage || 0;
    const [data, total] = await this.hotelRepository.list(page, perpage, query);
    return {
      page,
      perpage,
      data,
      total
    }
  }

  async update(id: number, args: HotelUpdateDto) {
    const {name, address, provinceId, districtId} = args;
    const hotel = await this.hotelRepository.getById(id);
    hotel.name = name || hotel.name;
    hotel.address = address || hotel.address;
    hotel.provinceId = provinceId || hotel.provinceId;
    hotel.districtId = districtId || hotel.districtId;
    return this.hotelRepository.save(hotel);
  }
  
  async delete(id: number) {
    const hotel = await this.hotelRepository.getById(id);
    hotel.isDeleted = true;
    return this.hotelRepository.save(hotel);
  }
}