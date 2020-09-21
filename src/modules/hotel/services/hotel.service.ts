import { Injectable } from "@nestjs/common";
import { HotelQueryDto } from "../dtos/hotel-query.dto";
import { HotelCreateDto } from "../dtos/hotel.dto";
import { Hotel } from "../models/hotel.entity";
import { HotelRepository } from "../repositories/hotel.repository";

@Injectable()
export class HotelService {

  constructor(private readonly hotelRepository: HotelRepository) {}

  async get(id: number): Promise<Hotel>{
    return this.hotelRepository.getById(id);
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
}