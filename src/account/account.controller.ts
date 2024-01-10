import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/createAccount.dto';
import { DeductFundsDto } from './dto/deductFunds.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Post()
  async deductFunds(@Body() deductFundsDto: DeductFundsDto) {
    await this.accountService.deductFunds(deductFundsDto);
    return 'OK';
  }
}
