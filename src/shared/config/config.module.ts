import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import path = require('path');
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        path.join(process.cwd(), `${process.env.NODE_ENV || ''}.env`),
        process.cwd(),
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
