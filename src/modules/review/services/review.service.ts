/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelService } from 'src/modules/hotel/services/hotel.service';
import { ReviewCreateDto } from '../dtos/review.dto';
import { TagCreateDto, TagUpdateDto } from '../dtos/tag.dto';
import { ReviewRepository } from '../repositories/review.repository';
import { TagRepository } from '../repositories/tag.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly hotelService: HotelService,
  ) {}

  async create(args: ReviewCreateDto) {
    const review = this.reviewRepository.create(args);
    return this.reviewRepository.save(review);
  }

  async get(id: number) {
    return this.reviewRepository.getById(id);
  }

  async update(id: number, args) {
    const { content, rating, images } = args;
    const review = await this.get(id);
    review.content = content || review.content;
    review.rating = rating || review.rating;
    review.images = images || review.images;
    this.hotelService.updateRating(review.hotelId);
    return this.reviewRepository.save(review);
  }

  async delete(id: number) {
    const review = await this.get(id);
    review.isDeleted = true;
    this.hotelService.updateRating(review.hotelId);
    return this.reviewRepository.save(review);
  }
}

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(args: TagCreateDto) {
    const tag = await this.tagRepository.create(args);
    return this.tagRepository.save(tag);
  }

  async list(query) {
    const [data, total] = await this.tagRepository.list(query);
    return {
      page: query.page || 0,
      perpage: query.perpage || 50,
      data,
      total,
    };
  }

  async get(id: number) {
    const tag = await this.tagRepository.getById(id);
    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    return tag;
  }

  async update(id: number, args: TagUpdateDto) {
    const { name } = args;
    const tag = await this.get(id);
    tag.name = name || tag.name;
    return this.tagRepository.save(tag);
  }

  async delete(id: number) {
    const tag = await this.get(id);
    tag.isDeleted = true;
    return this.tagRepository.save(tag);
  }
}
