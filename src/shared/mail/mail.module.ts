import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
