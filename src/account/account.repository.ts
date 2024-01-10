import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';

export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      user: { id: createAccountDto.userId },
    });
    return this.accountRepository.save(newAccount);
  }

  findByUserAndCurrency(userId: number, currency: string) {
    return this.accountRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        user: { id: userId },
        currency,
      },
    });
  }

  async updateAmmount(id: number, amount: number) {
    return this.accountRepository.update(
      {
        id,
      },
      { amount },
    );
  }
}
