/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HotelService } from 'src/modules/hotel/services/hotel.service';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';
import { RoomQueryDto, RoomTransactionQueryDto } from '../dtos/room-query.dto';
import { RoomCreateDto, RoomUpdateDto } from '../dtos/room.dto';
import { RoomService } from '../services/room.service';

@Controller('api.room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly hotelService: HotelService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() args: RoomCreateDto, @Req() req) {
    const {role, id: userId} = req.user || {};
    const hotel = await this.hotelService.get(args.hotelId);
    if (!['admin'].includes(role) && hotel.ownerId !== userId) {
      throw new ForbiddenException('no permission');
    }
    return this.roomService.create(args, hotel.ownerId);
  }

  @Get()
  async list(@Query() query: RoomQueryDto) {
    return this.roomService.list(query);
  }

  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number, @Query() query: RoomTransactionQueryDto) {
    const { start, end } = query;
    return this.roomService.getWithStock(id, start, end);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() args: RoomUpdateDto,
    @Req() req
  ) {
    const {role, id: userId} = req.user || {};
    const check = await this.roomService.checkPermission(id, userId);
    if (!['admin'].includes(role) && !check) {
      throw new ForbiddenException('no permission');
    }
    return this.roomService.update(id, args);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const {role, id: userId} = req.user || {};
    const check = await this.roomService.checkPermission(id, userId);
    if (!['admin'].includes(role) && !check) {
      throw new ForbiddenException('no permission');
    }
    return this.roomService.delete(id);
  }
}
