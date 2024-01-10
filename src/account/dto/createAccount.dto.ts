import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  currency: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  accountNumber: string;

  @IsInt()
  @Min(0)
  userId: number;
}
