import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MockBankingService } from '../mocks/mockBankService';
import { CardPaymentDto } from './dto/cardPayment.dto';
import { BankCardRepository } from './bankCard.repository';
import { CreateCardAccountDto } from './dto/createCardAccount.dto';

@Injectable()
export class CardPaymentService {
  constructor(
    private readonly mockBankingService: MockBankingService,
    private readonly bankCardRepository: BankCardRepository,
  ) {}

  async handlePayment(cardPaymentDto: CardPaymentDto) {
    //mocking actual bank API call, in case of success or failure web client will redirect to the correspinding page
    try {
      await this.mockBankingService.processPaymennt();
      return this.bankCardRepository.updateCardAmmount(cardPaymentDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  createCardAccount(createCardAccountDto: CreateCardAccountDto) {
    // in a real word scenario we should use some tokenization service to generate a token for bank card
    // and not store card data
    return this.bankCardRepository.createCardAccount(createCardAccountDto);
  }
}
