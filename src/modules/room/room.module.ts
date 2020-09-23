import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelModule } from '../hotel/hotel.module';
import { OrderModule } from '../order/order.module';
import { RoomController } from './controllers/room.controller';
import { Room } from './models/room.entity';
import { RoomRepository } from './repositories/room.repository';
import { RoomService } from './services/room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RoomRepository]),
    forwardRef(()=> HotelModule),
    forwardRef(()=> OrderModule),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
