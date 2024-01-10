import { Module } from '@nestjs/common';
import { CardPaymentController } from './card-payment.controller';
import { CardPaymentService } from './card-payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankCard } from './bankCard.entity';
import { BankCardRepository } from './bankCard.repository';
import { MockBankingService } from '../mocks/mockBankService';

@Module({
  imports: [TypeOrmModule.forFeature([BankCard])],
  controllers: [CardPaymentController],
  providers: [CardPaymentService, BankCardRepository, MockBankingService],
})
export class CardPaymentModule {}
