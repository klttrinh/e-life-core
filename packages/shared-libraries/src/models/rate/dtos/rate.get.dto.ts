import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum, IsObject, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import moment from 'moment';
import { TransactionTypeEnum } from '../../transaction';

export class RateGetDto {
  @IsString()
  @IsNotEmpty()
  pair: string;

  @IsBoolean()
  @IsOptional()
  allowStaled?: boolean;

  @IsObject()
  @IsOptional()
  rateSpreadInfo?: {
    merchantId: number | string;
    transactionType: TransactionTypeEnum;
    cryptoCurrencyId: number;
  };

  @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
  @IsDateString()
  @IsOptional()
  date?: string;
}
