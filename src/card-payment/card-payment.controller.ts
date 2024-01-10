import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CardPaymentService } from './card-payment.service';
import { CardPaymentDto } from './dto/cardPayment.dto';
import { CreateCardAccountDto } from './dto/createCardAccount.dto';

@Controller('cards')
export class CardPaymentController {
  constructor(private readonly cardPaymentService: CardPaymentService) {}
  @Post('payments')
  @HttpCode(200)
  async handlePayment(@Body() cardPaymentDto: CardPaymentDto) {
    await this.cardPaymentService.handlePayment(cardPaymentDto);
    return 'OK';
  }

  @Post()
  createCardAccount(@Body() createCardAccountDto: CreateCardAccountDto) {
    return this.cardPaymentService.createCardAccount(createCardAccountDto);
  }
}
