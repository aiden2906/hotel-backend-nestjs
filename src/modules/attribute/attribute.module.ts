import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import {
  AttributeController,
  AttributeOptionController,
} from './controllers/attribute.controller';
import { AttributeOption } from './models/attribute-option.entity';
import { Attribute } from './models/attribute.entity';
import { AttributeOptionRepository } from './repositories/attribute-option.repository';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeOptionService } from './services/attribute-option.service';
import { AttributeService } from './services/attribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attribute,
      AttributeOption,
      AttributeRepository,
      AttributeOptionRepository,
    ]),
    forwardRef(() => RoomModule),
  ],
  controllers: [AttributeController, AttributeOptionController],
  providers: [AttributeService, AttributeOptionService],
  exports: [AttributeService, AttributeOptionService],
})
export class AttributeModule {}
