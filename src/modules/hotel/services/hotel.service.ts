/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewCreateDto } from 'src/modules/review/dtos/review.dto';
import { ReviewService } from 'src/modules/review/services/review.service';
import { HotelQueryDto } from '../dtos/hotel-query.dto';
import {
  AddReviewDto,
  HotelCreateDto,
  HotelUpdateDto,
} from '../dtos/hotel.dto';
import { Hotel } from '../models/hotel.entity';
import { HotelRepository } from '../repositories/hotel.repository';

@Injectable()
export class HotelService {
  constructor(
    private readonly hotelRepository: HotelRepository,
    @Inject(forwardRef(() => ReviewService))
    private readonly reviewService: ReviewService,
  ) {}

  async get(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.getByIdWithRelation(id);
    if (!hotel) {
      throw new NotFoundException('Not found hotel');
    }
    return hotel;
  }

  async create(args: HotelCreateDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(args);
    return this.hotelRepository.save(hotel);
  }

  async list(query: HotelQueryDto): Promise<any> {
    const [data, total] = await this.hotelRepository.list(query);
    return {
      page: query.page,
      perpage: query.perpage,
      data,
      total,
    };
  }

  async update(id: number, args: HotelUpdateDto) {
    const { name, address, provinceId, districtId, images, description, wardId } = args;
    const hotel = await this.hotelRepository.getById(id);
    hotel.name = name || hotel.name;
    hotel.address = address || hotel.address;
    hotel.description = description || hotel.description;
    hotel.provinceId = provinceId || hotel.provinceId;
    hotel.districtId = districtId || hotel.districtId;
    hotel.wardId = wardId || hotel.wardId;
    hotel.images = images || hotel.images;
    return this.hotelRepository.save(hotel);
  }

  async review(id: number, customerId: number, args: AddReviewDto) {
    const { tagId, content, rating, images } = args;
    const hotel = await this.get(id);
    const reviewDto: ReviewCreateDto = {
      hotelId: hotel.id,
      customerId,
      tagId,
      content,
      rating,
      images,
    };
    return this.reviewService.create(reviewDto);
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

  async updateRating(id: number) {
    const hotel = await this.get(id);
    hotel.rating = hotel.reviews.reduce((cur, i) => cur + i.rating, 0) / hotel.reviews.length;
    return this.hotelRepository.save(hotel);
  }
}
