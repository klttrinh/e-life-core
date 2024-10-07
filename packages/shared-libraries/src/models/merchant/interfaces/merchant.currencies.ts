import { BookingCurrencyEnum } from '../../transaction';
import { FiatEnum } from '../../currency';

export interface IMerchantCurrencies {
  bookingCurrencyCode: BookingCurrencyEnum;
  bookingCurrencyId: number;
  settlementCurrencyId: number;
  settlementCurrencyCode: string;
  settlementSpread: number;
  depositMinimumAmount: number;
  depositDefaultAmount: number;
  depositMaximumAmount: number;
  withdrawalMinimumAmount: number;
  withdrawalMaximumAmount: number;
  fiatCurrencyCode: FiatEnum;
  fiatCurrencyId: number;
}
