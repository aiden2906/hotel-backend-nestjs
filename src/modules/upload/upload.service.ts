/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/shared/config/config.service';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(files: any[]) {
    const publicUrls = files.map(f => this.getPublicUrl(f.filename));
    return publicUrls;
  }

  private getPublicUrl(filename: string): string {
    return `${this.configService.baseUrl}/${this.configService.imageDir}/${filename}`;
  }
}
