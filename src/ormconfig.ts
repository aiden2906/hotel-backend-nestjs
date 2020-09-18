// tslint:disable-next-line:no-var-requires
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from './shared/config/config.service';
import path = require('path');
const configService = new ConfigService(
  path.join(process.cwd(), `${process.env.NODE_ENV || ''}.env`),
  process.cwd(),
);

const {
  host,
  port,
  name,
  user,
  password,
} = configService.databaseConfig;

const config: ConnectionOptions = {
  type: 'postgres',
  host,
  port,
  username: user,
  password,
  database: name,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migration/*.{ts,js}'],
  cli: {
    migrationsDir: __dirname + '/migration',
  },
};

export = config;
