/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('api.upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @Post('image')
  @UseInterceptors(FilesInterceptor('image'))
  uploadFile(@UploadedFiles() files): Promise<string[]> {
    console.log('---- UploadFile: ', files);
    return this.uploadService.uploadImage(files);
  }
}
