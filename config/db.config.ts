import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  migrationsRun: false,
  migrationsTransactionMode: 'each',
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
});
