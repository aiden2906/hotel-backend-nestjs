import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from 'src/shared/config/config.module';
import { MulterConfigService } from 'src/shared/upload-config/multer-config.service';
import { UploadConfigModule } from 'src/shared/upload-config/upload-config.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [UploadConfigModule],
      useExisting: MulterConfigService,
    }),
    ConfigModule,
  ],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
