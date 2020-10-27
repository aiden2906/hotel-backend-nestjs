import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from '../attribute/attribute.module';
import { HotelModule } from '../hotel/hotel.module';
import { OrderModule } from '../order/order.module';
import { RoomController } from './controllers/room.controller';
import { RoomAttribute } from './models/room-attribute.entity';
import { Room } from './models/room.entity';
import { RoomAttributeRepository } from './repositories/room-attribute.repository';
import { RoomRepository } from './repositories/room.repository';
import { RoomAttributeService } from './services/room-attribute.service';
import { RoomService } from './services/room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      RoomAttribute,
      RoomRepository,
      RoomAttributeRepository,
    ]),
    forwardRef(() => AttributeModule),
    forwardRef(() => HotelModule),
    forwardRef(() => OrderModule),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomAttributeService],
  exports: [RoomService, RoomAttributeService],
})
export class RoomModule {}
