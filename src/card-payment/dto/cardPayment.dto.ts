import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CardPaymentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(20)
  cardNumber: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
