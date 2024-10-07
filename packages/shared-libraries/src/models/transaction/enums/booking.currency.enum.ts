import { ExternalBookingCurrencyEnum } from '../../merchant/enums/external.booking.currency.enum';
import { CryptoEnum } from '../../currency/enums/crypto.enum';

export const BookingCurrencyEnum = { ...ExternalBookingCurrencyEnum, ...CryptoEnum, USDTTR: 'USDTTR' };
export type BookingCurrencyEnum =
  | (typeof CryptoEnum)[keyof typeof CryptoEnum]
  | (typeof ExternalBookingCurrencyEnum)[keyof typeof ExternalBookingCurrencyEnum];
