import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './controllers/hotel.controller';
import { Hotel } from './models/hotel.entity';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './services/hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, HotelRepository])],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
