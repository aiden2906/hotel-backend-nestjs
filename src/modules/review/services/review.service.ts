/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewCreateDto } from '../dtos/review.dto';
import { TagCreateDto, TagUpdateDto } from '../dtos/tag.dto';
import { ReviewRepository } from '../repositories/review.repository';
import { TagRepository } from '../repositories/tag.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(args: ReviewCreateDto) {
    const review = await this.reviewRepository.create(args);
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
    return this.reviewRepository.save(review);
  }

  async delete(id: number) {
    const review = await this.get(id);
    review.isDeleted = true;
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
    const page = query.page || 0;
    const perpage = query.perpage || 50;
    const [data, total] = await this.tagRepository.list(page, perpage);
    return {
      page,
      perpage,
      data,
      total
    }
  }

  async get(id: number) {
    const tag = await this.tagRepository.getById(id);
    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    return tag;
  }

  async update(id: number, args: TagUpdateDto) {
    const {name} = args;
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
