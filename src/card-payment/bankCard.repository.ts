import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BankCard } from './bankCard.entity';
import { CardPaymentDto } from './dto/cardPayment.dto';
import { CreateCardAccountDto } from './dto/createCardAccount.dto';
import { BadRequestException } from '@nestjs/common';

export class BankCardRepository {
  constructor(
    @InjectRepository(BankCard)
    private bankCardRepository: Repository<BankCard>,
  ) {}

  async updateCardAmmount(cardPaymentDto: CardPaymentDto) {
    const bankCard = await this.bankCardRepository.findOne({
      where: {
        cardNumber: cardPaymentDto.cardNumber,
      },
    });

    if (!bankCard) {
      throw new BadRequestException();
    }

    return this.bankCardRepository.update(
      {
        id: bankCard.id,
      },
      { amount: bankCard.amount + cardPaymentDto.amount },
    );
  }

  createCardAccount(createCardAccountDto: CreateCardAccountDto) {
    const newAccount = this.bankCardRepository.create({
      ...createCardAccountDto,
      amount: 0,
      user: { id: createCardAccountDto.userId },
    });
    return this.bankCardRepository.save(newAccount);
  }
}
