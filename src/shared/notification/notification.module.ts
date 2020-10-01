import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class NotificationModule {}
