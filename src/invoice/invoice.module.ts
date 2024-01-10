import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { AccountModule } from '../account/account.module';
import { MockAccountingService } from '../mocks/mockAccountingService';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), AccountModule],
  providers: [InvoiceService, InvoiceRepository, MockAccountingService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
