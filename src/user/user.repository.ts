import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Account } from '../account/account.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    const roubleAccount = new Account();
    roubleAccount.currency = 'rouble';
    roubleAccount.amount = 150;
    roubleAccount.accountNumber = '15789891';
    roubleAccount.user = newUser;
    newUser.accounts = [roubleAccount];

    const user = await this.userRepository.save(newUser);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accounts: user.accounts.map((acc) => ({
        id: acc.id,
        currency: acc.currency,
        amount: acc.amount,
        accountNumber: acc.accountNumber,
      })),
    };
  }
}
