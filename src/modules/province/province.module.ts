import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictController, ProvinceController, WardController } from './controllers/province.controller';
import { District } from './models/district.entity';
import { Province } from './models/province.entity';
import { Ward } from './models/ward.entity';
import { DistrictService, ProvinceService, WardService } from './services/province.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [ProvinceController, DistrictController, WardController],
  providers: [ProvinceService, DistrictService, WardService],
  exports: [ProvinceService, DistrictService, WardService],
})
export class ProvinceModule {}
