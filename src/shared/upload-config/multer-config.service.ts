import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { ConfigService } from "../config/config.service";
import * as uuid from 'uuidv4';
import multer = require('multer');


@Injectable()
export class MulterConfigService implements MulterOptionsFactory {

  constructor(private readonly configService: ConfigService) {}
  
  createMulterOptions(): MulterModuleOptions {
    const storage = multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const {fieldname} = file;
        let path: string;
        switch (fieldname) {
          case 'document':
            path = this.configService.documentDir;
            break;
          default:
            path = this.configService.imageDir;
            break;
        }
        cb(null, path);
      },
      filename: (req: any, file: any, cb: any) => {
        const filesegments = file.originalname.split('.');
        const ext = filesegments.pop();
        cb(null, uuid() + '-' + filesegments.join() + '.' + ext);
      }
    })
    const options: MulterModuleOptions = {
      storage,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }
    return options;
  }
}