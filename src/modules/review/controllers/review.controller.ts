/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewQueryDto } from '../dtos/review-query.dto';
import { ReviewUpdateDto } from '../dtos/review.dto';
import { TagCreateDto, TagUpdateDto } from '../dtos/tag.dto';
import { ReviewService, TagService } from '../services/review.service';

@Controller('api.review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async list(@Query() query: ReviewQueryDto){
    return this.reviewService.list(query);
  }

  @Put(':id')
  async update(
    @Body() args: ReviewUpdateDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.reviewService.update(id, args);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.reviewService.delete(id);
  }
}

@Controller('api.tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() args: TagCreateDto) {
    return this.tagService.create(args);
  }

  @Get()
  async list(@Query() query) {
    return this.tagService.list(query);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: TagUpdateDto,
  ) {
    return this.tagService.update(id, args);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.tagService.delete(id);
  }
}
