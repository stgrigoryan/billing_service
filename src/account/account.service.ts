import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/createAccount.dto';
import { DeductFundsDto } from './dto/deductFunds.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.create(createAccountDto);
  }

  findByUserAndCurrency(userId: number, currency: string) {
    return this.accountRepository.findByUserAndCurrency(userId, currency);
  }

  async deductFunds(deductFundsDto: DeductFundsDto) {
    const account = await this.accountRepository.findByUserAndCurrency(
      deductFundsDto.userId,
      deductFundsDto.currency,
    );

    if (account?.amount - deductFundsDto.amount < 0) {
      throw new BadRequestException();
    }

    return this.accountRepository.updateAmmount(
      account.id,
      account.amount - deductFundsDto.amount,
    );
  }
}
