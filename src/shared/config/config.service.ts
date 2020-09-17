import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

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
    console.log('config', config);
    this.envConfig = this.validateInput(config);
    console.log('envConfig', this.envConfig);
    for (const k in this.envConfig) {
      if (this.envConfig.hasOwnProperty(k)) {
        process.env[k] = this.envConfig[k];
      }
    }
  }

  get(key: string) {
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

  private validateInput(envConfig: EnvConfig) {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['', 'development', 'production', 'test', 'provision'])
        .default(''),
      PORT: Joi.number().default(3000),
      DB_DATABASE: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
    });
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
