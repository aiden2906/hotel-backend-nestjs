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
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';
import { HotelQueryDto } from '../dtos/hotel-query.dto';
import { HotelCreateDto, HotelUpdateDto } from '../dtos/hotel.dto';
import { Hotel } from '../models/hotel.entity';
import { HotelService } from '../services/hotel.service';

@Controller('api.hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id', new ParseIntPipe()) id: number): Promise<Hotel> {
    return this.hotelService.get(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(@Query() query: HotelQueryDto){
    return this.hotelService.list(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() args: HotelCreateDto, @Req() req: any): Promise<Hotel> {
    const userId = req.user && req.user.id;
    const role = req.user && req.user.role;
    if (!['admin'].includes(role)) {
      args.ownerId = userId;
    }
    return this.hotelService.create(args);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() args: HotelUpdateDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req,
  ) {
    const role = req.user && req.user.role;
    const check = await this.hotelService.checkPermission(id, req.user.id);
    if (!['admin'].includes(role) && !check) {
      throw new ForbiddenException('no permission');
    }
    return this.hotelService.update(id, args);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const role = req.user && req.user.role;
    const check = await this.hotelService.checkPermission(id, req.user.id);
    if (!['admin'].includes(role) && !check) {
      throw new ForbiddenException('no permission');
    }
    return this.hotelService.delete(id);
  }
}
