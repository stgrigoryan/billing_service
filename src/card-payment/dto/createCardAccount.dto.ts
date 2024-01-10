import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const dateValidationRegexp = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

export class CreateCardAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(20)
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @Matches(dateValidationRegexp, { message: `expiry date is not valid` })
  expiryDate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(55)
  cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(55)
  cardHolderLastName: string;

  @IsNumber()
  @Min(0)
  securityCode: number;

  @IsInt()
  @Min(0)
  userId: number;
}
