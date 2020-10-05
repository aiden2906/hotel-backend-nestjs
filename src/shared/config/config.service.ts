import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import path = require('path');

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig;
  constructor(filePath: string, private readonly projectDir: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
    for (const k in this.envConfig) {
      if (this.envConfig.hasOwnProperty(k)) {
        process.env[k] = this.envConfig[k];
      }
    }
  }

  get(key: string): any {
    return process.env[key];
  }

  get databaseConfig(): DatabaseConfig {
    return {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      name: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    };
  }

  get baseUrl(): string {
    console.log('---- baseUrl: ', this.envConfig.BASE_URL);
    return this.envConfig.BASE_URL;
  }

  get publicDir(): string {
    console.log(
      '---- publicDir: ',
      path.join(this.projectDir, this.envConfig.PUBLIC_DIR || 'public'),
    );
    return path.join(this.projectDir, this.envConfig.PUBLIC_DIR || 'public');
  }

  get imageDir(): string {
    console.log(
      '---- imageDir: ',
      path.join(this.publicDir, this.envConfig.IMAGE_DIR || 'image'),
    );
    return path.join(this.publicDir, this.envConfig.IMAGE_DIR || 'image');
  }

  get documentDir(): string {
    console.log(
      '---- documentDir: ',
      path.join(this.publicDir, this.envConfig.DOCUMENT_DIR || 'document'),
    );
    return path.join(this.publicDir, this.envConfig.DOCUMENT_DIR || 'document');
  }

  get gmailAccount(): any {
    return {
      user: this.envConfig.GMAIL_USER,
      pass: this.envConfig.GMAIL_PASSWORD,
    };
  }

  get telegram(): string {
    return this.envConfig.TELEGRAM_TOKEN;
  }

  private validateInput(envConfig: EnvConfig) {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['', 'development', 'production', 'test', 'provision'])
        .default(''),
      BASE_URL: Joi.string().required(),
      PORT: Joi.number().default(3000),
      DB_DATABASE: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      PUBLIC_DIR: Joi.string().required(),
      IMAGE_DIR: Joi.string().required(),
      DOCUMENT_DIR: Joi.string().required(),
      GMAIL_USER: Joi.string().required(),
      GMAIL_PASSWORD: Joi.string().required(),
      TELEGRAM_TOKEN: Joi.string().required(),
    });
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
