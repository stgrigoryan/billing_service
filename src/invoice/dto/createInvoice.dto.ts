import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  currency: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsInt()
  @Min(0)
  userId: number;
}
