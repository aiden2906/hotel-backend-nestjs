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
import { RoomQueryDto } from '../dtos/room-query.dto';
import { RoomCreateDto, RoomUpdateDto } from '../dtos/room.dto';
import { RoomService } from '../services/room.service';

@Controller('api.room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  async create(@Body() args: RoomCreateDto) {
    return this.roomService.create(args);
  }

  @Get()
  async list(@Query() query: RoomQueryDto) {
    return this.roomService.list(query);
  }

  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number, @Query() query) {
    const {start, end} = query;
    return this.roomService.getWithStock(id, start, end);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: RoomUpdateDto,
  ) {
    return this.roomService.update(id, args);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.roomService.delete(id);
  }
}
