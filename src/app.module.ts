import { Module } from '@nestjs/common';
import config from 'config/config';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoiceModule } from './invoice/invoice.module';
import { CardPaymentModule } from './card-payment/card-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        migrationsRun: false,
        migrations: [resolve(__dirname, '../migrations/*.{ts,js}')],
        migrationsTransactionMode: 'each',
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    AccountModule,
    InvoiceModule,
    CardPaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
