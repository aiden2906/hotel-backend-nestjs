import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { MulterConfigService } from "./multer-config.service";

@Module({
  imports:[ConfigModule],
  controllers: [],
  providers: [MulterConfigService],
  exports: [MulterConfigService],
})
export class UploadConfigModule {}